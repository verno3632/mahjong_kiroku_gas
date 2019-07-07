#!/bin/bash

set -e

echo $CLASPRC_JSON > ~/.clasprc.json
sed -e "s/SCRIPT_ID/$SCRIPT_ID/g" .clasp.json.template > .clasp.json
npx @google/clasp push | grep errors && exit 1
npx @google/clasp deploy --description `git rev-parse HEAD` 
