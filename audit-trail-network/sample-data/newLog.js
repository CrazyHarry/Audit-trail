/**
 * Vlaamse Overheid - Smartie - 2018
 * Populates the hyperledger business network with generated participants, log files and audit requests
 * Author: Adam 'blvck' Blazejczak
 */

'use strict';

// use the bn-connection module
const bnUtil = require('./bn-connection-util');

// connect to business network
bnUtil.cardName='daniel@audit-trail-network';
bnUtil.connect(main);

// constants
const namespace = 'be.vlaanderen.audittrail';
const logEntryType = 'LogEntry';
const newLogEntry = 'NewLogEntry';

// main function - calls all other functions that will generate data
/**
 * @param error
 */
function main(error){
    if(error){
        console.log(error);
        process.exit(1);
    }

    var departments = ['AIV', 'OMGEVING'];
    var auditors = ['auditor_aiv', 'auditor_omgeving'];
    var publicServants = [{name:'daniel', dep: 'AIV'}, {name:'pascal', dep:'OMGEVING'}]; // daniel = entity 'AIV', pascal = entity 'omgeving'

    var civilians = ['adam', 'dieter', 'bram'];

    var contextTypes_DO = ['Omgevingsvergunning', 'Bestuurlijke sanctionering', 'Erkenning', 'Inspectie'];
    var contextTypes_AIV = ['Subsidie-aanvraag'];

    var Promise = require('es6-promise').Promise;
    var loremIpsum = require('lorem-ipsum'); // to generate free-text

    // 1. Get the 'NewLogEntry' TransactionRegistry
    return bnUtil.connection.getTransactionRegistry('be.vlaanderen.audittrail.NewLogEntry').then((registry)=>{
        console.log('1. Received Transaction Registry: ', registry.id);



    }).catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    });

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
     * @param id
     * @param accssed_by_id
     * @param data_owner_id
     * @param context
     * @param department
     */
    function addLogEntry(registry, id, accssed_by_id, data_owner_id, context, department){
        const bnDef = bnUtil.connection.getBusinessNetwork();
        const factory = bnDef.getFactory();

        // create fabric resource
        let logResource = factory.newTransaction(namespace, newLogEntry);

        // create relationships to relevant stakeholders
        let accessed_by = factory.newRelationship(namespace, 'ParticipantPublicServant', accssed_by_id);
        let data_owner = factory.newRelationship(namespace, 'ParticipantCivilian', data_owner_id);

        // add timestamp
        var d = randomDate();
        var date = d.toUTCString();
        logResource.setPropertyValue('timestamp',date);

        // add dummy information
        logResource.setPropertyValue('carbon_hash', require('crypto').createHash('md5').update(date).digest('hex'));
        logResource.setPropertyValue('accessed_by', accessed_by);
        logResource.setPropertyValue('data_owner', data_owner);
        logResource.setPropertyValue('context', context);
        logResource.setPropertyValue('department_name', department);

        return registry.add(logResource);
    }

}