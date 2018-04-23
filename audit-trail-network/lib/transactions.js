/*
    Vlaamse Overheid 2018 - April

    Author: Adam 'Blvck' Blazejczak
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

            // generate Log Entry Asset
            var logentry = factory.newResource(ns, asset, log_id);
            d = new Date();
            logentry.timestamp = d.toUTCString();

            // add extra information
            logentry.carbon_hash = newLogData.carbon_hash;
            logentry.accessed_by = newLogData.accessed_by;
            logentry.data_owner = newLogData.data_owner;
            logentry.category = newLogData.category;
            logentry.context = newLogData.context;

            if (newLogData.document) // if document exists -> add
                logentry.document = newLogData.document;          

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

            // generate Audit Request 
            var audit_entry = factory.newResource(ns, asset, audit_id);
            var d = new Date();
            audit_entry.timestamp = d.toUTCString();
            audit_entry.request_state = "REQUESTED";

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
