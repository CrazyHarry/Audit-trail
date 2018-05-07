#!/bin/bash

# mongo ds161346.mlab.com:61346/audit-trail-auth -u admin -p adminpoc

#1. Set up the REST server to multi user mode    true | false
export COMPOSER_MULTIUSER=true

#2. Set up our remote mongodb connection, set-up using https://mlab.com/databases/
export COMPOSER_DATASOURCES='{
    "db": {
        "name": "db",
        
        "host": "ds161346.mlab.com",
        "port": 61346,
       
        "database": "audit-trail-auth",
        "user": "admin",
        "password": "adminpoc",

        "connector": "mongodb"  
    }
}'

# Execute the script for enabling authentication
./github-auth.sh
#./local-auth.sh
