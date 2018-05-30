# Audit Trail Business Network

This directory contains the business network for the Audit Trail PoC, for the department environment. The business network has been modeled in HyperLedger Composer.

## Folder Structure

- **dist**: 
- **features**: 
- **lib**: 
- **models**: 
- **sample-data**: 
- **test**: 

## What is HyperLedger Composer?

HyperLedger Composer is a set of open source tools allowing for rapid application development of blockchain applications, developed by IBM.

HyperLedger Composer makes it "business friendly" to develop blockchain applications as modeling the data, transactions and smart-contracts are written in a human-readable format. 

Furthermore, HyperLedger Composer provides tools to:
- Behaviour Driven Development (BDD) Tests written in human-readable text
- generate a rest-server to communicate with network
- generate an Angular application to quickly develop front-end applications

HyperLedger Composer runs on top of HyperLedger Fabric, for more information please visit the [official website](https://hyperledger.github.io/composer/latest/).

As a final note, HyperLedger Composer runs it's applications as "business networks".

## Business Network

A business network is a combination of a **business network model**, **ACLs** (access control lists) and **smart contracts**.

- The **business network model** is a definition of stakeholders, assets and operations stakeholders can perform on these assets.

- The **ACLs** is a dynamic rule-based specification of access control that stakeholders have on assets.

- **Smart contracts** are execution statements for transactions, written in javascript.

### Business Network Model Definition

The business network model of **Audit-trail** is defined in `./models/be.vlaanderen.audittrail.cto`.

A business network defines stakeholders, assets and transactions. 

Stakeholders are represented as `Participants` on the HyperLedger Composer Blockchain. We have the following stakeholders defined in this model:
- **Civilians**: People like you and me of which's data is being accessed.
- **Public Servants**: Public Servants who access personal data in certain contexts.
- **Entities**: Public Servants work for departments or entities within the flemish government.
- **Auditors**: Auditors or DPOs (Data Privacy Officers) who will review and audit the access-logs in the system.


In **Audit-trail** the primary asset is a `LogEntry`, containing essential data including:
- Whose data got accessed
- When the data was created
- Who accessed the data
- Why the data got accessed

The owner of a `LogEntry` is a `Civilian`. `Public Servants` create these log entries when access personal data in government applications.

Whenever the citizen does not agree or understand why some data got accessed, he can dispute the `LogEntry` by creating another asset, an `AuditRequest`, and specify his reason for disputing this log.

An `AuditRequest` links back to the original log the `Civilian` disputed and contains data for the `Auditor` to streamline the reviewing process:
- A hash to the original log in government's databases.
- Means to contact the civilian in case of dispute settlement.
- All information included in the `LogEntry`.
- The state of the audit request (is it being reviewed? Is it settled?)

Per entity or department an assigned auditor can read these `AuditRequests`, follow up with their respective entities and settle disputes by updating the `Audit Request`.

All interactions described above can be executed using 3 scoped transactions:
- **New Log Entry**: creates a new log entry.
- **New Audit Request**: creates a new audit request.
- **Update Audit Request**: updates an audit request.

Transactions in a *business network model* only define what data has to be included in the transaction for it's succesful completion. The execution code of transactions is specified in smart contracts. The smart contracts for the above transactions, written in JavaScript, can be found in `./lib/transactions.js`.

### ACLs

Transactions and read access to assets have to be limited to priveleged participants on the network. This is done using **Access Control Lists**.


## Quick Start

To quickly play around with the business network, try using the [Composer Playground](https://composer-playground.mybluemix.net/). It runs locally on your browser and allows to quickly test transactions and the business network. 

For usage, upload `dist/audit-trail-network@x.x.x.bna` to Playground and deplay the network.

## Installing the business network on a network

Create an archive file:
```composer archive create -t dist -n ../```

Install the archive file on the network
```composer network install -a cardname.bna -c PeerAdmin@hlfv1```

Start the network, this will generate a network admin card
```composer network start -c PeerAdmin@hlv1 -n audit-trail-network -V 0.0.1 -A admin -S adminpw```

To import the network admin card
```composer card import -f filecard```

Check what cards are imported
```composer card list```

To check if the network is up and running
```composer network list -c admin@audit-trail-network```
```composer network ping -c admin@audit-trail-network```

To upgrade the business network application:
1. create an archive
2. install it
3. composer network upgrade -c PeerAdmin@hlfv1 -n audit-trail-network -V 0.0.2

To start a rest server, just type in `composer-rest-server` and follow along what's written.