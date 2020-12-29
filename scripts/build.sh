#!/usr/bin/env bash

# clean dist
rm -rf dist

# build
tsc

# copy templates into dist directory
cp -r templates dist
