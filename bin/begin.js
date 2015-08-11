#!/usr/bin/env node
if(process.argv.length < 4){
    console.info(process.argv[1] + ' <где> <что...>');
    return;
}
var lib = require('../index.js'),
    path = require('path'),
    fs = require('fs'),
    where = path.resolve(process.argv[2]),
    what = process.argv.slice(3).join(' ');

try{
    lib.begin(where, what);
    console.log('Начато дело "' + what + '" в "' + where + '"');
}catch(e){
    require('../errors.js')(e, where, what);
}
