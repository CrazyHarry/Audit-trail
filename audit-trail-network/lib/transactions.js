/*
    Vlaamse Overheid 2018 - April

    Author: Adam 'Blvck' Blazejczak

    This file contains the transaction logic when executing
 */

'use strict';

/**
 * Add a new log entry to the channel
 * @param {be.vlaanderen.audittrail.NewLogEntry} newLogData
 * @transaction
 */
function newLogEntry(newLogData) {
    // Get the Asset Registry
    return getAssetRegistry('be.vlaanderen.audittrail.LogEntry')

        // then execute the following
        .then(function(logRegistry){
            // information needed to create new log
            var factory = getFactory();
            var ns =  'be.vlaanderen.audittrail'; // namespace
            var asset = 'LogEntry'; // defined in models

            // generate a random log_id
            var log_id = Math.random().toString(36).substr(2, 15);
            if ('log_id' in newLogData){
                log_id = newLogData.log_id;
            }

            // generate Log Entry Asset
            var logentry = factory.newResource(ns, asset, log_id);
            var d = new Date();
            logentry.timestamp = d.toUTCString();

            // add extra information
            logentry.carbon_hash = newLogData.carbon_hash;
            logentry.accessed_by = newLogData.accessed_by;
            logentry.data_owner = newLogData.data_owner;
            logentry.category = newLogData.category;
            logentry.context = newLogData.context;

            if (newLogData.document){ // if document exists -> add
                logentry.document = newLogData.document;
            }

            // emit event regarding registration of the log
            var event = factory.newEvent(ns, 'LogEntryAdded');
            event.log_id = log_id;
            emit(event);

            // Add log to registry
            return logRegistry.add(logentry);
        });
}

/**
 * Add a new log entry to the channel
 * @param {be.vlaanderen.audittrail.NewAuditRequest} newAuditData
 * @transaction
 */
function newAuditRequest(newAuditData) {
    // Get the Asset Registry
    return getAssetRegistry('be.vlaanderen.audittrail.AuditRequest')

        // then execute the following
        .then(function(auditRegistry){
            // information needed to create new log
            var factory = getFactory();
            var ns =  'be.vlaanderen.audittrail'; // namespace
            var asset = 'AuditRequest'; // defined in models

            // generate a random log_id
            var audit_id = Math.random().toString(36).substr(2, 15);
            if ('audit_id' in newAuditData){
                audit_id = newAuditData.audit_id;
            }

            // generate Audit Request
            var audit_entry = factory.newResource(ns, asset, audit_id);
            var d = new Date();
            audit_entry.timestamp = d.toUTCString();
            audit_entry.request_state = 'REQUESTED';

            // add extra information
            audit_entry.sender = newAuditData.sender;
            audit_entry.auditor = newAuditData.auditor;
            audit_entry.log_to_review = newAuditData.log_to_review;

            // emit event regarding registration of the log
            var event = factory.newEvent(ns, 'AuditRequestAdded');
            event.audit_id = audit_id;
            emit(event);

            // Add audit to registry
            return auditRegistry.add(audit_entry);
        });
}

/**
 * Add a new log entry to the channel
 * @param {be.vlaanderen.audittrail.ChangeAuditRequestState} newAuditState
 * @transaction
 */
function changeAuditRequestState(newAuditState) {
    var auditRegistry={};
    // Get the Asset Registry
    return getAssetRegistry('be.vlaanderen.audittrail.AuditRequest')
        // then execute the following
        .then(function(registry){
            auditRegistry = registry;
            return auditRegistry.get(newAuditState.audit_id);
        }).then(function(audit_request){
            // catch if there is no audit request found
            if(!audit_request){
                throw new Error('Flight : '+newAuditState.flightId,' Not Found!!!');
            }

            // update the audit request state
            audit_request.request_state = newAuditState.new_state;

            // update registry
            return auditRegistry.update(audit_request);
        }).then(function(){
            // successful update
            var event = getFactory().newEvent('be.vlaanderen.audittrail', 'AuditRequestUpdated');
            event.audit_id = newAuditState.audit_id;
            emit(event);

        }).catch(function(error){
            throw new Error(error);
        });
}
