# Case study: Audit-trail on Ethereum

## Context
With Ethereum being one of the most popular cryptocurrencies and most popular platform for distributed applications (DApps), during the PoC we attempted to build a [Last of Chain](./README.md#last-of-chain) and a  [First of Chain](./README.md#first-of-chain) scenario on the Ethereum platform.

In this document we'll discuss how Ethereum as a platform was not a viable option for our envisioned scenarios at this point in time.

## Last of Chain

In a Last of Chain scenario the blockchain-based logging system acts essentially as a carbon-copy of the current logging system of the Department Environment. We could describe two distinct methods to use Ethereum in this scenario:
- Store the logs on chain.
- Store the logs in conventional databases and use `anchoring` to verify integrity.

### On-chain log storage

Storing the logs on chain on the Ethereum platform poses a first big problem: everything on Ethereum is open to the public. This is essential for the consensus algorithms to verify transactions and ledger-state changes.

The exposed logs contain information that should not be accessible by everyone. A solution to this problem is encryption, i.e. you could store encrypted logs on the chain. This poses the following concerns:
- Why not use [Twitter](twitter.com) to store encrypted logs?
- Who will keep the private-key for log decryption?
- Users would filter through the logs somehow to get to their logs. The mapping from user-identity to the logs-IDs could be stored on a smart contract, but this information would be easily retrievable, and is against the purpose of private logs.
- Since the Ethereum blockchain is immutable, once a private-key is compromised, all previously logged logs are free to be viewed by the hacker.

### Anchoring

Using the anchoring method, logs would be stored in a conventional database. Every few minutes or hours a 'snapshot' would be taken from the database creating a checksum. This checksum can now be stored on the Ethereum blockchain, which allows for integrity verification.

The main issue with anchoring is that although integrity can be shown, it cannot be guaranteed. If someone changes the state of the database, the checksums won't match and you can't 'rollback' to a previous state.

The second major concern with anchoring is the nature of the anchor itself. If a database is captured by hackers and they erase or add a few records and create a new checksum anchor, it's almost impossible to tell the difference between malicious edits and legitimate edits just by looking at the anchors stored on the Ethereum chain.

Taking these concerns into consideration, it can be concluded that using Ethereum to anchor a database isn't the best means for the goal, because tweeting the checksums for example is an evenly viable option to store the anchors.

## First of Chain

In a First of Chain scenario the blockchain-based logging system acts as an enforced-logging database for sensitive information. In such a scenario, someone retrieving information results in an inevitable log of this access.

However as with the Last of Chain scenario, the same major issue stands : everything on the Ethereum blockchain is public. It's more public that most people realize. For example, within a Solidity smart contract one can write code which encapsulates defining variables, structs and functions. You'd assume that a variable can only be retrieved, if a function is defined to "get" that variable. Not on Ethereum. In fact it's quite easy to look up a smart contract's ethereum address, "disassemble" it and scan the contract for any variables or hidden information it might contain. It is possible to obscure information by spreading it over several variables, but that only slows down the path of a competent hacker. 

In other words, storing sensitive information on a smart contract is currently not a feasible option. 

That being said, at this moment cutting-edge cryptographic algorithms are being researched by top scientists in the world. One such algorithm is `homomorphic encryption` which would allow a smart contract to be fully encrypted and operate as if it was not encrypted at all, essentially making the content of a smart contract private.

### With homomorphic encryption

If by estimate in 2-3 years `homomorphic encryption` will reach its desired maturity, then sensitive information could in fact be stored on a smart contract.

On the Ethereum blockchain there is a small problem however. A function that returns data needs to return exactly the same data by every node on the network, otherwise such a function is non-deterministic. A deterministic function is also called a `static` function, as it does not perform any changes to the blockchain (or world-state). 

In other words, if a user asks for data and the returned value depends on a permission-based rule system, then this rule-system needs to be stored in the world-state or on the blockchain to ensure the deterministic nature of a `static` function.

A first of chain scenario would encapsulate the following steps before a user could retrieve information from a smart contract:
- Write the permission in the smart contract (transaction).
- Wait 10 minutes for the transaction to be mined and stored on the blockchain.
- Read the personal data you'd like to retrieve (static).

## Conclusion

In the current state of Ethereum development, we wouldn't adivse to use Ethereum as a store for logs or for anchoring. The case does become more interesting, when we start seeing smart contracts as autonomous, self-containing and self-enforcing containers, for permissioned private data access. However we believe it will take a few years before this will be the case.
