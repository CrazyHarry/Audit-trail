#1. Set up the card to be used
export COMPOSER_CARD=admin@audit-trail-network

#2. Set up the namespace usage    always |  never
export COMPOSER_NAMESPACES=never

#3. Set up the REST server Authhentcation    true | false
export COMPOSER_AUTHENTICATION=true

#4. Set up the Passport strategy provider
export COMPOSER_PROVIDERS='{
  "github": {
    "provider": "github",
    "module": "passport-github",
    "clientID": "4e00cf76b6da18159a0d",
    "clientSecret": "6d9c55e3bfc51299ed2ebe55eee667326cfe96e4",
    "authPath": "/auth/github",
    "callbackURL": "/auth/github/callback",
    "successRedirect": "/",
    "failureRedirect": "/"
  }
}'

#5. Execute the REST server
composer-rest-server

# "successRedirect": "http://localhost:4200?loggedIn=true"
