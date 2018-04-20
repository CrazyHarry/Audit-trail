# audit-trail-network

This directory contains the HyperLedger Composer Business Network Application for the Audit Trail PoC, for the department environment.

## Installing the business network

Create an archive file:
```composer archive create -t dist -n ../```

Install the archive file on the network
```composer network install -a cardname.bna -c PeerAdmin@hlfv1```

Start the network, this will generate a network admin card
```composer network start -c PeerAdmin@hlv1 -n airlinev8 -V 0.0.1 -A admin -S adminpw```

To import the network admin card
```composer card import -f filecard```

Check what cards are imported
```composer card list```

To check if the network is up and running
```composer network list -c admin@airlinev8```
```composer network ping -c admin@airlinev8```

To upgrade the business network application:
1. create an archive
2. install it
3. composer network upgrade -c PeerAdmin@hlfv1 -n airlinev8 -V 0.0.2

To start a rest server, just type in `composer-rest-server` and follow along what's written.