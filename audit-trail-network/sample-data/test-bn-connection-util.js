'use strict';
/**
 * Vlaamse Overheid - Smartie - 2018
 * This script tests `bn-connection-util.js`
 * Author: Adam 'blvck' Blazejczak
 */

const bnUtil = require('./bn-connection-util').default;

// This creates the business network connection object
// and calls connect() on it. Calls the callback method
// 'main' with error
bnUtil.connect(main);

// Callback function passed to the BN Connection utility
// Error has value if there was an error in connect()
/**
 * @param error
 */
function main(error){
    // 1. Check for the connection error
    if(error){
        console.log(error);
        process.exit(1);
    }

    console.log('1. Successfully Connected !!!');

    // 2. Lets ping
    bnUtil.ping((response, error)=>{
        if(error){
            console.log(error);
        } else {
            console.log('2. Received Ping Response:');
            console.log(response);
        }

        // 3. Disconnect
        bnUtil.disconnect();

        console.log('3. Disconnected');
    });
}