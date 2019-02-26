#!/bin/bash
rm -rf ./client/build
rm -rf ./server/public/
cd client
npm install
npm run build
cd ..
cp -r ./client/build/ ./server/public
echo "*" > ./server/public/.gitignore
echo "Done build & copy!"