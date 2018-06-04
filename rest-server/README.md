# Composer REST Server

Hyperledger Composer comes with a rest-server which, after specifying the network location and business network cards, allows to manipulate resources on the blockchain network through the REST protocol. The server allows to be ran on a single-user basis (for development) or a multi-user setup. Both will be discussed below.

## Architecture

![Architecture](architecture.png "Architecture")



## Single-User (Development and testing)


## Multi-User (Production)


## Notes




1. run `./github-auth.sh` to setup environment variables
2. run `./start.sh` to start

## Enabling multi-user RESt server authentication

1. Enable AUTH on the REST Server
2. Setup peristent storage for wallet management
3. isntall the loopback DB connector module
4. Extend the launch script to enable multi-user mode
5. Setup the identity on BNA = OAuth Identity

