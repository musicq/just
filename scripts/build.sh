#!/usr/bin/env bash

rm -rf ./bin/*.js
rm -rf ./bin/*.js.map
rm -rf ./lib/**/*.js
rm -rf ./lib/**/*.js.map

# build
tsc --build tsconfig.json
