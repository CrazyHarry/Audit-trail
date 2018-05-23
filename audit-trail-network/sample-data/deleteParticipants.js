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


// main function - calls all other functions that will generate data
/**
 * @param error
 */
function main(error){
    if(error){
        console.log(error);
        process.exit(1);
    }

    var toRemove = ['Entity','ParticipantAuditor', 'ParticipantPublicServant', 'ParticipantCivilian'];

    // first remove all log entries, THEN remove all audit requests
    removeType(toRemove[0]).then(() => {
        return removeType(toRemove[1]).then(() => {
            return removeType(toRemove[2]).then(() => {
                return removeType(toRemove[3]).then(() => {
                    console.log("Succesfully removed all participants from all registries");
                });
            });    
        });
    });

    // main function - Removes all participants of a certain type
    /**
     * @param type: participant type
     */
    function removeType(type){
        return bnUtil.connection.getParticipantRegistry('be.vlaanderen.audittrail.'+type).then((registry)=>{
            console.log('Got registry with id:', registry.id);

            return registry.getAll().then((resources) => {
                return registry.removeAll(resources).then(() => {
                    console.log('Sucessfully removed all participants!');
                });
            });

        }).catch((error)=>{
            console.log(error);
            bnUtil.disconnect();
        });
    }

}