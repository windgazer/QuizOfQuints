# Quiz Of Quints Server

This is a 'Node.js' based server application intended as a backend to the Quiz Of Quints app. To install you need to setup a qoqconfig.js in your home-dir, or supply one on the command-line. In this config file you need to supply the appropriate app-keys and point to your couch-db.

    {
        fb-api:        '[your api key]',
        google-api:    '[your api key]',
        couchdb:       'https://[example].iriscouch.com/qoq'
        couchtdb:       'https://[example].iriscouch.com/tqoq'
    }

## Unit testing

For testing one should install https://github.com/mhevery/jasmine-node

    npm install jasmine-node -g

Which you can then run using

    jasmine-node spec/

