#1. Set up the card to be used
export COMPOSER_CARD=admin@audit-trail-network

#2. Set up the namespace usage    always |  never
export COMPOSER_NAMESPACES=never

#3. Set up the REST server Authhentcation    true | false
export COMPOSER_AUTHENTICATION=true

#4. Set up the Passport strategy provider
export COMPOSER_PROVIDERS='{
  "local": { 
    "provider": "local", 
    "module": "passport-local", 
    "usernameField": "username", 
    "passwordField": "password", 
    "authPath": "/auth/local", 
    "callbackURL":"/auth/local/callback",
    "successRedirect": "/", 
    "failureRedirect": "/", 
    "setAccessToken": true, 
    "callbackHTTPMethod": "post" 
   }
}'

#5. Execute the REST server
composer-rest-server

# "successRedirect": "http://localhost:4200?loggedIn=true"
