/*
    Vlaamse Overheid 2018 - April

    Author: Adam 'Blvck' Blazejczak
 */

'use strict';

/**
 * Add a new log entry to the channel
 * @param {be.vlaanderen.audittrail.t_NewLogEntry} newLogData
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
            var logentry = factory.newResource(ns, asset, log_id);
            
            // add extra information
            d = new Date();
            logentry.timestamp = d.toUTCString();

            logentry.carbon_hash = newLogData.carbon_hash;
            logentry.accessed_by = newLogData.accessed_by;
            logentry.data_owner = newLogData.data_owner;
            logentry.category = newLogData.category;
            logentry.context = newLogData.context;

            if (newLogData.document) 
                logentry.document = newLogData.document;          

            // emit event regarding registration of the log
            var event = factory.newEvent(ns, 'event_LogRegistered');
            event.log_id = log_id;
            emit(event);

            // Add flight to registry
            return logRegistry.add(logentry);
        });

}
