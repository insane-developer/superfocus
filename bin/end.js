#!/usr/bin/env node
var lib = require('../index.js'),
    path = require('path'),
    fs = require('fs'),
    nopt = require('nopt'),
    args = nopt({
        hard: Boolean
    }),
    where;

if(!args.argv.remain || args.argv.remain.length !== 1){
    console.info(process.argv[1] + ' <где> [--hard]');
    return;
}
where = path.resolve(args.argv.remain[0]);

try{
    if(args.hard){
        lib.erase(where);
        console.log('Очищено "' + where + '"');
    }else{
        lib.end(where);
        console.log('Закончено дело в "' + where + '"');
    }
}catch(e){
    require('../errors.js')(e, where);
}
