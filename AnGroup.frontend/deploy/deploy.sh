#!/bin/bash

DEPLOY_SERVER=$DEPLOY_SERVER
SERVER_FOLDER="papperless.acstech.vn"

# Building React output
yarn install
yarn run build:stg

echo "Deploying to ${DEPLOY_SERVER}"
echo "run script : scp -r build/* /var/www/${SERVER_FOLDER}/public"
scp -r build/* /var/www/${SERVER_FOLDER}/public

echo "Finished copying the build files"
