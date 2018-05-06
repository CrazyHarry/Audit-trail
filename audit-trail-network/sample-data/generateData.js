/**
 * Vlaamse Overheid - Smartie - 2018
 * Populates the hyperledger business network with generated participants, log files and audit requests
 * Author: Adam 'blvck' Blazejczak
 */

// use the bn-connection module
const bnUtil = require('./bn-connection-util');

// connect to business network
bnUtil.cardName='admin@audit-trail-network';
bnUtil.connect(main);

// constants
const namespace = 'be.vlaanderen.audittrail';
const logEntryType = 'LogEntry';
const auditRequestType = 'AuditRequest'

// main function - calls all other functions that will generate data
function main(error){
    if(error){
        console.log(error)
        process.exit(1)
    }

    // 2. Get the 'LogEntry' AssetRegistry
    return bnUtil.connection.getAssetRegistry('be.vlaanderen.audittrail.LogEntry').then((registry)=>{
        console.log('1. Received Registry: ', registry.id);

        // add the dummy logs
        addLogEntry(registry, 'daniel', 'adam', 'BOUWVERGUNNING');

    // 3. Get the 'AuditRequest' AssetRegistry
    return bnUtil.connection.getAssetRegistry('be.vlaanderen.audittrail.AuditRequest');

    }).then((registry)=>{
        console.log('1. Received Registry: ', registry.id);

        // add the audit request logs
        addAuditRequest(registry, 'adam', 'auditor1', 'randomlog');

    }).catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    });
}

// function to create new dummy LogEntry
function addLogEntry(registry, accssed_by_id, data_owner_id, category){
    const bnDef = bnUtil.connection.getBusinessNetwork();
    const factory = bnDef.getFactory();
    var id = Math.random().toString(36).substr(2, 15);
    let logResource = factory.newResource(namespace,logEntryType, id);

    let accessed_by = factory.newRelationship(namespace, 'ParticipantPublicServant', accssed_by_id);
    let data_owner = factory.newRelationship(namespace, 'ParticipantCivilian', data_owner_id);

    // add timestamp
    var d = new Date();
    var date = d.toUTCString()
    logResource.setPropertyValue('timestamp',date);

    // add dummy information
    logResource.setPropertyValue('carbon_hash', require('crypto').createHash('md5').update(date).digest("hex"));
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
    var date = d.toUTCString()
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