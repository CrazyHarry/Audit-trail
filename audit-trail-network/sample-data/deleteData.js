/**
 * Vlaamse Overheid - Smartie - 2018
 * Removes all assets of type LogEntry and AuditRequests
 * Author: Adam 'blvck' Blazejczak
 */

'use strict';

// use the bn-connection module
const bnUtil = require('./bn-connection-util');

// connect to business network
bnUtil.cardName='admin@audit-trail-network';
bnUtil.connect(main);

// constants
const namespace = 'be.vlaanderen.audittrail';
const logEntryType = 'LogEntry';
const auditRequestType = 'AuditRequest';

// main function - calls all other functions that will generate data
/**
 * @param error
 */
function main(error){
    if(error){
        console.log(error);
        process.exit(1);
    }

    // first remove all log entries, THEN remove all audit requests
    removeLogEntries().then(() => {
        return removeAuditRequests();
    });

    // main function - calls all other functions that will generate data
    /**
     */
    function removeLogEntries(){
        return bnUtil.connection.getAssetRegistry('be.vlaanderen.audittrail.LogEntry').then((registry)=>{
            console.log('Got registry with id:', registry.id);

            return registry.getAll().then((resources) => {
                return registry.removeAll(resources).then(() => {
                    console.log('Sucessfully removed all logs!');
                });
            });

        }).catch((error)=>{
            console.log(error);
            bnUtil.disconnect();
        });
    }

    // main function - calls all other functions that will generate data
    /**
     */
    function removeAuditRequests(){
        return bnUtil.connection.getAssetRegistry('be.vlaanderen.audittrail.AuditRequest').then((registry)=>{
            console.log('Got registry with id:', registry.id);

            return registry.getAll().then((resources) => {
                return registry.removeAll(resources).then(() => {
                    console.log('Sucessfully removed all audit requests!');
                });
            });

        }).catch((error)=>{
            console.log(error);
            bnUtil.disconnect();
        });
    }

}