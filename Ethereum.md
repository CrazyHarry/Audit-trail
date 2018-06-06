# Case study: Audit-trail on Ethereum

## Context
With Ethereum being one of the most popular cryptocurrencies and most popular platform for distributed applications (DApps), during the PoC we attempted to built a [last of Chain](./README.md#last-of-chain) and a  [First of Chain](./README.md#first-of-chain) scenario on the Ethereum platform.

In this document we'll discuss how both Ethereum as a platform is unviable for such scenario's at this point in time.

## Last of Chain

In a Last of Chain scenario the blockchain-based logging system acts essentially as a carbon-copy of the logging system already in place at the Flemish Government. We could describe two distinct methods to use ethereum in this scenario:
- Store the logs on chain.
- Store the logs in conventional databases and use `anchoring` to verify integrity.

### On-chain log storage

Storing the logs on chain on the Ethereum platform poses a big first problem: everything on Ethereun is open for the public. This is nesseccary for consensus algorithms, for veryfing transactions and ledger-state changes.

The exposed logs contain information that should not be viewed by everyone. A solution to this problem is encryption, ie: you could store encrypted logs on the chain. This poses the following problems:
- Why not use [Twitter](twitter.com) to store encrypted logs?
- Who will keep the private-key for log decryption?
- Users would filter through the logs somehow to get to their logs. The mapping from user-identity to the logs-IDs could be stored on a smart contract but this information would be easy retrieve, and is against the purpose of privitized logs.
- Since the Ethereum blockchain is immutable, once a private-key is compromised, all previously logged logs are free to be viewed by the hacker.

### Anchoring

Using the anchoring method, logs would be stored in a conventional database. Every few minutes or hours a 'snapshot' would be taken from the database creating a checksum. This checksum can now be stored on the Ethereum blockchain, which allows for integrity verification.

The main problem with anchoring is that although integrity can be shown, warranting integrity is not an option. If someone changes the state of the database, the checksums won't match and you can't 'rollback' to a previous state.

The second major problem with anchoring is the nature of the anchor itself. Take this example: If a database gets capture by hackers, they erase or add a few records and create a new checksum anchor. One can't tell a difference between malicious edits and legitimate edits just by looking at the anchors stored on the Ethereum chain.

Taking above problems by anecdote, one doesn't need Ethereum to anchor a database, as tweeting the checksums is as much of a viable option to store the anchors.

## First of Chain

In a First of Chain scenario the blockchain-based logging system acts as an enforced-logging database for sensitive information. In such a scenario, someone retrieving information results in an inevitable log of this access.

However as with the Last of Chain scenario, the same major issue prevails: on the Ethereum blockchain everything is public. It's more public that most people realize. For example, within a Solidity smart contract one can write code which encapsulates defining variables, structs and functions. You'd think that a variable can only be retrieved if a function is defined to "get" that variable. Not on Ethereum, in fact it's quite easy to lookup a smart contract's ethereum address, "de-assemle" it and scan the contract for any variables or hidden information it might contain. One could obscure information by spreading it over several variables but that only slows down the path of a competent hacker. 

In other words, storing sensitive information on a smart contract is currently unfeasible. 

That being said, at this moment cutting-edge cryptographic algorithms are being researched by top scientists in the world. One such algorithm is `homomorphic encryption` which would allow a smart contract to be fully encrypted and operate as-if it was not encrypted at all, essentially privatizing the content of a smart contract.

### With homomorphic encryption

If by estimate in 2-3 years `homomorphic encryption` will reach it's height, then sensitive information could in fact be stored on a smart contract.

On the Ethereum blockchain there is a small problem however. A function that returns data needs to return exactly the same data by every node on the network, otherwise such a function is non-deterministic. A deterministic function is also called a `static` function as it does not perform any changes to the blockchain (or world-state). 

In other words, if some user asks for some data and the returned value depends on some permission-based rule system, then this rule-system needs to be stored in the world-state or on the blockchain to ensure the deterministic nature of a `static` function.

A first of chain scenario would encapsulate the following steps before someone could retrieve information from a smart contract:
- Write the permission in the smart contract (transaction).
- Wait 10 minutes for the transaction to be mined and stored on the blockchain.
- Read the personal data you'd like to retrieve (static).

## Conclusion

In the current state of Ethereum development, using Ethereum as a store for logs makes little sense. Using Ethereum for anchoring even less so. The case becomes more interesting however, when we'll start seeing smart contracts as autonomous, self-containing and self-enforcing containers, for permissioned privatized data access. We'll have to wait a few years before this will be the case.