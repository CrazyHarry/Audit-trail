/**
 * Vlaamse Overheid - Smartie - 2018
 * Populates the hyperledger business network with generated participants, log files and audit requests
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

    var auditors = ['auditor1', 'auditor2'];
    var civilians = ['adam', 'dieter', 'bram'];
    var publicServants = ['daniel', 'pascal'];

    var contextTypes = ['BOUWVERGUNNING', 'SUBSIDIE', 'GESLACHTSVERANDERING', 'HUWELIJK', 
                        'SOCIALEWONING', 'STEMPELGELD', 'VERKAVELING'];

    // 2. Get the 'LogEntry' AssetRegistry
    return bnUtil.connection.getAssetRegistry('be.vlaanderen.audittrail.LogEntry').then((registry)=>{
        console.log('1. Received Registry: ', registry.id);

        // add the dummy logs
        for (let i = 0; i < 20; i++) { 
            addLogEntry(registry, rand(publicServants), rand(civilians), rand(contextTypes));
        }

        // 3. Get the 'AuditRequest' AssetRegistry
        return bnUtil.connection.getAssetRegistry('be.vlaanderen.audittrail.AuditRequest');

    }).then((registry)=>{
        console.log('2. Received Registry: ', registry.id);

        // add the audit request logs
        for (let i = 0; i < 5; i++) { 
            addAuditRequest(registry, rand(civilians), rand(auditors), Math.random().toString(36).substr(2, 15));
        }

    }).catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    });
}

// function pick random from array
/**
 * @param arr
 */
function rand(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

// function to create new dummy LogEntry
/**
 * @param registry
 * @param accssed_by_id
 * @param data_owner_id
 * @param category
 */
function addLogEntry(registry, accssed_by_id, data_owner_id, category){
    const bnDef = bnUtil.connection.getBusinessNetwork();
    const factory = bnDef.getFactory();
    var id = Math.random().toString(36).substr(2, 15);
    let logResource = factory.newResource(namespace,logEntryType, id);

    let accessed_by = factory.newRelationship(namespace, 'ParticipantPublicServant', accssed_by_id);
    let data_owner = factory.newRelationship(namespace, 'ParticipantCivilian', data_owner_id);

    // add timestamp
    var d = new Date();
    var date = d.toUTCString();
    logResource.setPropertyValue('timestamp',date);

    // add dummy information
    logResource.setPropertyValue('carbon_hash', require('crypto').createHash('md5').update(date).digest('hex'));
    logResource.setPropertyValue('accessed_by', accessed_by);
    logResource.setPropertyValue('data_owner', data_owner);
    logResource.setPropertyValue('category', category);
    logResource.setPropertyValue('context', 'document context');

    // add dummy to the registry, which will add it to the network
    return registry.add(logResource).then(()=>{
        console.log('Successfully created the log entry',id);
        return;
    }).catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    });
}

/**
 * @param registry
 * @param sender_id
 * @param auditor_id
 * @param log_id
 */
function addAuditRequest(registry, sender_id, auditor_id, log_id){
    const bnDef = bnUtil.connection.getBusinessNetwork();
    const factory = bnDef.getFactory();
    var id = Math.random().toString(36).substr(2, 15);
    let auditRequestResource = factory.newResource(namespace,auditRequestType, id);

    let sender = factory.newRelationship(namespace, 'ParticipantCivilian', sender_id);
    let auditor = factory.newRelationship(namespace, 'ParticipantAuditor', auditor_id);
    let log_to_review = factory.newRelationship(namespace, 'LogEntry', log_id);

    // add timestamp
    var d = new Date();
    var date = d.toUTCString();
    auditRequestResource.setPropertyValue('timestamp',date);

    // add dummy information
    auditRequestResource.setPropertyValue('request_state', 'REQUESTED');
    auditRequestResource.setPropertyValue('sender', sender);
    auditRequestResource.setPropertyValue('auditor', auditor);
    auditRequestResource.setPropertyValue('log_to_review', log_to_review);

    // add dummy to the registry, which will add it to the network
    return registry.add(auditRequestResource).then(()=>{
        console.log('Successfully created audit request',id);
        return;
    }).catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    });
}