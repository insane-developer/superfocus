#!/usr/bin/env node
var lib = require('../index.js'),
    where = process.argv[2] || '.';
try{
    console.log(lib.recursiveWhat(where));
}catch(e){}
