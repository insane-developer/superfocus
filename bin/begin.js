#!/usr/bin/env node
var lib = require('../index.js'),
    path = require('path'),
    fs = require('fs'),
    nopt = require('nopt'),
    args = nopt({
        f: Boolean
    }),
    where = path.resolve(args.argv.remain[0]),
    what = args.argv.remain.slice(1).join(' ');

if(!args.argv.remain || args.argv.remain.length !== 2){
    console.info(process.argv[1] + ' <где> <что...> [-f]');
    return;
}

try{
    lib.begin(where, what, args.f);
    console.log('Начато дело "' + what + '" в "' + where + '"');
}catch(e){
    require('../errors.js')(e, where, what);
}
