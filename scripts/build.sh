#!/usr/bin/env bash

# clean dist
rm -rf dist

# build
tsc

# copy templates into dist directory
cp -r templates dist

# copy extra files
cp LICENSE dist
cp README.md dist
