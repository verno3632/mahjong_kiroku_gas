#!/bin/bash

echo $CLASPRC_JSON > ~/.clasprc.json
sed -e "s/SCRIPT_ID/$SCRIPT_ID/g" .clasp.json.template > .clasp.json
npx @google/clasp push
