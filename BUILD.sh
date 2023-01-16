#!/bin/sh
tsc && pkg -t win-x64,linux-x64,macos-x64 ./dist/index.js -o font-to-costume
npx ts-node ./src/index.ts