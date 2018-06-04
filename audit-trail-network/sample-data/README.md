## Dummy data: Populating the business network with examples

Since this repo contains the code of a Proof-of-Concept implementation of an Audit-Trail applicaiton on HyperLedger Composer, it's been decided by authorities to work with dummy data to demonstrate the business network's functionality.

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

## Running Tests

To test the business network
~~~~
npm test
~~~~