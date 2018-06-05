# Audit-trail

![App](audit-trail-app/img/app.jpg)

**Audit-trail** is a Flemish Government ran Proof-of-Concept (PoC) to demonstrate how early-stage blockchain technologies can be leveraged to make a decentralized and immutable logging-system allowing for:
- Transparent reporting to citizens.
- Disputing government's access behaviour, by citizens.
- Enriched and accurate auditing of logs and disputes.

This project was requested by "Departement Environment", part of the Flemish Government.

## Motivation

The Flemish Government (Vlaamse Overheid) is seeking ways to empower it's citizens with ownership of their personal data. As in other governments, civilian's personal data is usually located in a centralized database. A government process in need of your personal data (your age, your family composition, your tax returns, ...) will access this data and log the access. These access-logs are stored internally for audit purposes. 

The main idea is to make these logs available to citizens in an online portal, allowing citizens to have an idea which of their personal data is being used and in which government process or context. A few applications have been developed allowing for such functionality, including [MAGDA](https://overheid.vlaanderen.be/magda) and [Burgerprofiel](https://overheid.vlaanderen.be/mijn-burgerprofiel). Both have their strengths and weaknesses.

With the hype of blockchain being in full swing since 2017, The Flemish Government is investing into innovative blockchain projects to **survey and test** how the technology can help shape the future of data and privacy, building a decentralized, trustless and transparent government.

## Concepts

### Last of Chain

If you can't thrust logs, they become worthless. Logs are worthless if they could be modified. They're also worthless if the logging can be disabled. That's why blockchain technologies come to mind as they allow for an immutable, consensus driven, distributed single source of truth of logs to exist.

However, at the moment of writing this documentation page, the current processes at the flemish government access personal data first and log later on. 

Furthermore, personal data access and logging are 2 seperate systems, which means the logging system could be turned-off for a few minutes if shady access needs to be conducted (through internal or external forces).

We'll be calling this scheme a **Last of Chain** logging system, as the logging system is literally the last piece of the data-chain, registering what happened before it.

### First of Chain

The solution to the last of chain problem would be to intergrate the sensitive database and the logging into a single component, essentially making the logging **First of Chain**.

Solutions like these exist already. For example, popular databases like MySQL and Postgresql allow for logging directly by the database itself, which would eliminate this problem. However in a systems like this, the logs are usually encoded in plain-text, not immutable. You could check and test integrity with checksums, but that's about it.

Other than the immutability problem, databases are usually not built with logs in mind. How do you guarantee logging whenever someone accesses data? I believe this can be done through **smart-contracts**. Smart contracts are self-exucuting and self-enforcing pieces of code that come with a guarantee of execution.

A well written-smart contract would allow for access of the data and have a quaranteed log on the ledger, in one single request. Added to this, with a well protected and thought out encryptic circuitry, the only access-point to this data would be through **one-single-point-of-access**, meaning the data cannot be accessed on any other channel. You use this channel, you're presence has been logged. You go with a different alley, you won't be accessing the data you need.

### Smart Mandates

What's even more interesting is that in a **First of Chain** scenario built on a blockchain, **smart mandates** would emerge. Smart mandates are an electronic permit allowing an instance to access someone's specific private data if that person allowed for such access in the first place.

For example, by signing a contract for a building permit, you could automatically generate a smart mandate to allow specific governmental instances to access nesseccary data for as long as the smart mandate is valid.

### This Proof-of-Concept

In this PoC we primarely focused on replicating the **Last of Chain** scenario as a stepping stone for further iterations. The primary goals of this proof of concept is to address the maturity and applicability of blockchain's strengths in similar scenarios.

## Used Technologies in this PoC

- [HyperLedger Composer](https://hyperledger.github.io/composer/latest/)
- [Ethereum](https://www.ethereum.org/)
- [Angular](https://angular.io/)
- [Passport](http://www.passportjs.org/)

## Repository Structure

- **audt-trail-network**: contains the Audit Trail business network model, for HyperLedger Composer
- **audit-trail-app**: contains an angular front-end application allowing for direct communication with the Audit Trail business network through a rest-server
- **rest-server**: rest-server launch scripts

## Architecture

Go to [this section](./rest-server#architecture) for a complete overview of the currently implemented architecture.

## Installation and usage

For a TL;DR installation and setup of **Audit-trail**:
1. [Install HyperLedger Composer on your machine](https://hyperledger.github.io/composer/latest/installing/installing-index.html)
2. [Install and start the **Audit-trail** business network](./audit-trail-network#deployment-of-the-business-network)
3. [Run the Composer REST server](rest-server#running-a-single-user-rest-server-development-and-testing)
4. [Run the Angular Front-End application](./audit-trail-app#running-development-server)

Furthermore, every folder contains it's own readme with documentation and details regarding the code and motivation behind implementation decisions.

# Ethereum case study

[Click here](./Ethereum.md) to read the Ethereum case study for this PoC.