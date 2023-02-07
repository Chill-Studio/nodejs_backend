# node-js-boiler-plate

A Node.js boilerplate with ES6, ESLint, and Prettier, and Mocha

## Getting started

Installation :
`npm i`
`npm install -g nodemon`

Run tests :
`npm test`

Run server :
`npm start`

## Dump local mongoose database

1. Go to https://www.mongodb.com/try/download/database-tools?tck=docs_databasetools and download the tools.
2. If you are on Windows, open this folder, go into "bin" folder (you will have all .exe files)
3. Copy and add the path to your environnement variable.
4. Open the project folder, then and CMD inside of it and do : mongodump -d chillangDatabase -o ./src/mongoose/dump/testData/

## Code generation

```shell
yarn crud <apiName>
```
