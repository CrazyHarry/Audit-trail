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

    // 2. Add civilians to the network (participants)
    return bnUtil.connection.getParticipantRegistry('be.vlaanderen.audittrail.ParticipantCivilian').then((registry)=>{
        console.log('1. Received Registry: ', registry.id);

        addCivilian(registry, 'adam');
        addCivilian(registry, 'dieter');
        addCivilian(registry, 'bram');

        // 2. Add public servants to the network (participants)
        return bnUtil.connection.getParticipantRegistry('be.vlaanderen.audittrail.ParticipantPublicServant');

    }).then((registry)=>{
        console.log('2. Received Registry: ', registry.id);

        addPublicServant(registry, 'daniel', 'INFORMATIEVLAANDEREN');
        addPublicServant(registry, 'pascal', 'DEPARTEMENTOMGEVING');

        // 3. Add auditor to the network (participants)
        return bnUtil.connection.getParticipantRegistry('be.vlaanderen.audittrail.ParticipantAuditor');

    }).then((registry)=>{
        console.log('3. Received Registry: ', registry.id);

        addAuditor(registry, 'auditor1');
        addAuditor(registry, 'auditor2');

    }).catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    });
}

/**
 * @param registry
 * @param id
 */
function addCivilian(registry, id){
    const bnDef = bnUtil.connection.getBusinessNetwork();
    const factory = bnDef.getFactory();

    let civilian = factory.newResource('be.vlaanderen.audittrail', 'ParticipantCivilian', id);

    // add dummy to the registry, which will add it to the network
    return registry.add(civilian).then(()=>{
        console.log('Successfully added civilian',id);
        return;
    }).catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    });
}

/**
 * @param registry
 * @param id
 * @param department
 */
function addPublicServant(registry, id, department){
    const bnDef = bnUtil.connection.getBusinessNetwork();
    const factory = bnDef.getFactory();

    let publicServant = factory.newResource('be.vlaanderen.audittrail', 'ParticipantPublicServant', id);
    publicServant.department = department;

    // add dummy to the registry, which will add it to the network
    return registry.add(publicServant).then(()=>{
        console.log('Successfully added public servant',id);
        return;
    }).catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    });
}

/**
 * @param registry
 * @param id
 */
function addAuditor(registry, id){
    const bnDef = bnUtil.connection.getBusinessNetwork();
    const factory = bnDef.getFactory();

    let auditor = factory.newResource('be.vlaanderen.audittrail', 'ParticipantAuditor', id);

    // add dummy to the registry, which will add it to the network
    return registry.add(auditor).then(()=>{
        console.log('Successfully added auditor',id);
        return;
    }).catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    });
}