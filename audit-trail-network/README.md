# Audit Trail Business Network

This directory contains the business network for the Audit Trail PoC, for the department environment. The business network has been modeled in HyperLedger Composer.

## Folder Structure

- **dist**: contains bna files (business network archives) and scripts to create, install and upgrade those.
- **features**: contains cucumber-style written scenario tests which test the business network.
- **lib**: contains execution code for transactions (also known as smart contracts) written in JavaScript.
- **models**: contains the business network model in a `*.cto` file.
- **sample-data**: contains scripts to generate dummy data to populate the network with.

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

The owner of a `LogEntry` is a `Civilian`. `Public Servants` create these log entries when personal data is being accessed in government applications.

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

Transactions and read access to assets have to be limited to priveleged participants on the network. This is done using **Access Control Lists**, which are specified in `permissions.acl` using readable code structure.

ACLs in HyperLedger Composer consist of rules. By default all access is denied, unless a rule matches the interaction. A rule describes statically the following: who (participant) can do which action (operation) on what resource (resource), optionally through which transaction (transction). To make the rule system more dynamic, Composer's ACLs allows to specify dynamic conditions to meet.

In the Audit-Trail business network we have 4 types of participants, 2 assets and 3 transactions:

Type | Definition | Explanation 
--- | --- | --- 
Participant | `Entity` | A ghost-participant to represent a department within The Flemish Government.
Participant | `ParticipantAuditor` | Representing an auditor or DPO, belongs to an `Entity`.
Participant | `ParticipantPublicServant` | Represents a public servant, belongs to an `Entity`.
Participant | `ParticipantCivilian` | Represents a civilian on the blockchain.
Asset | `AuditRequest` | Represents an audit request, issued when a civilian disputes.
Asset | `LogEntry` | Represents a log entry, containing essential information regarding data access.
Transaction | `NewLogEntry` | A transaction to create a new `LogEntry`.
Transaction | `NewAuditRequest` | A transaction to create a new `AuditRequest`.
Transaction | `ChangeAuditRequestState` | A transaction to change the state of an audit request.

The table below gives an overview of participants and their most important rules.

Participant | Rule
--- | --- 
`ParticipantCivilian` | Can **read** *his logs*, specified in the `data_owner` attribute of a `LogEntry`
`ParticipantCivilian` | Can **read** *his audit requests*, specified in the `sender` attribute of a `AuditRequest`
`ParticipantCivilian` | Can **create** new audit requests using the `NewAuditRequest` transaction
`ParticipantPublicServant` | Can **create** new log entries using the `NewLogEntry` transaction
`ParticipantAuditor` | Can **read** logs created by public servants from *his department* (`Entity`)
`ParticipantAuditor` | Can **read** *his* audit requests, which correspond to logs created by public servants from *his department*
`ParticipantAuditor` | Can **update** the state of his audit requests (REQUESTED, UNDERREVISION or DONE)

## Business Network Cards

A business network model specifies digitized assets and participants. Whenever someone creates a new participant, say a new `ParticipantCivilian`, this partipant needs to be *mapped* to an identity, a civilian in this case. The **identity issueing** to a particular participant on the blockchain is done by the business network administrator. 

Whenever a business network admin issues a new identity, a **business network card** is created. This business network cards is send or given through a secure channel to the person whose identity has been created. The business network card is essentially a wallet containing specifications towards your blockchain identity, the participant you map on, the certficate authority and nessecary information to connect with the Audit-trail business network. 

Compromising a business network card means compromising someone else's identity on the blockchain, which makes it important to keep this business network card safe.

To read more on business network cards, please visit the [official documentation](https://hyperledger.github.io/composer/v0.16/playground/id-cards-playground).

For information on issuing identities on this business network, see section on **Dummy data** below.

## Quick Start

To quickly play around with the business network, try using the [Composer Playground](https://composer-playground.mybluemix.net/). It runs locally in your browser and allows to quickly test transactions and the business network model. 

For usage, upload `dist/audit-trail-network@x.x.x.bna` to Playground and deploy the network.

## Deployment of the business network

The deployment process has been streamlined with scripts located in the `./dist/` folder. We'll take the following steps to deploy the network:
1. Run `./dist/1-create-archive.sh` to create a business network archive (*.bna file). A business network archive is a file containing the network model, permissions, transactions and smart contracts in one single file. This script will generate a new file `audit-trail-network@x.x.x.bna` where `x.x.x` is the version of the network specified in `package.json`.
2. Run `./dist/2-install-bna.sh 0.1.0` to install version `0.1.0` of the business network on the Hyperledger node. After installation, the network definition is known to your local peer node, but the network is not up and running yet. For thes we need the next step.
3. Run `./dist/3-start-network.sh 0.1.0` to start your previously installed network. After execution the script will have generated a new **network admin business card**. The network administrator is at network start the only identity allowing to issue new identities and make changes to the network.
4. Run `./dist/4-reinstall-admincard.sh` to install the network admin business card on your system.

You can test if the network is running with the following command:
```composer network list -c admin@audit-trail-network```

Whenever a new version rolls out and a previous version of audit-trail is running, use `./dist/5-upgrade-network x.x.x` to upgrade the network to version `x.x.x`.

## Dummy data: Populating the business network with examples

Since this repo contains the code of a Proof-of-Concept implementation of an Audit-Trail applicaiton on HyperLedger Composer, it's been decided by authorities to work with dummy data to demonstrate the business network's functionality.

The scripts to generate data are located in the folder `./sample-data/`. To execute the scripts first navigate to this folder first.

### The dummy data

First we'll add participants to our business network, we'll be adding the following partcipants:
- civilians
    - adam
    - dieter
    - bram
- public servants
    - daniel (from entity AIV)
    - pascal (from entity OMGEVING)
- auditors
    - auditor_aiv (from AIV)
    - auditor_aiv (from OMGEVING)
- entities
    - AIV (Agentschap Informatie Vlaanderen)
    - OMGEVING (Departement Omgeving)

Run the following command to add these participants:
~~~~
    cd sample-data
    node generateParticipants.js
    # after succesfull adding press ctrl-c 
~~~~

Second, we'll be issuing identies for these particpants. This will generate business network cards which we'll install to use with the rest-server later on.

Run the following commands to issue identites and install the cards:
~~~~
    cd sample-data
    chmod +x issue-identities.sh
    ./issue-identities.sh
    cd cards
    ./1-delete-cards.sh
    ./2-import-cards.sh
    cd ..
~~~~

The last step involves generating logs and audit requests for these participants. Included is a script which will generate 20 logs and 5 audit requests, attributed randomly to the participants specified above with a random context specification (eg:  'BOUWVERGUNNING', 'SUBSIDIE', 'GESLACHTSVERANDERING', 'HUWELIJK').

Run the following commands to generate new logs
~~~~
    cd sample-data
    node generateData.js
    # after succesfull generation press ctrl-c 
~~~~

## Connecting to the business network

Hyperledger Composer comes with a rest-server which automatically scans the business network definition and exposes operations like read, delete, commit transaction and issue identity via a REST protocol.

For more information, visit the README located in the `rest-server` folder at the root of this repository.

## Important Notes

- Implementation is currently tested on a single node setup. This is because HyperLedger Composer deployment on a multi-node and multi-organizational not officially supported.
