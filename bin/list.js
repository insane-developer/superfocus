#!/usr/bin/env node
var list = require('../index.js').list(),
    smth = [],
    empty = [];
for(var path in list){
    if(list[path] === null){
        empty.push(path);
    }else{
        smth.push(path + '\t' + list[path]);
    }
}
if(!smth.length && !empty.length){
    console.log('Нет ни одного зарегистрированного места');
}
if(smth.length){
    console.log('Активные задачи:\n\t' + smth.sort().join('\n\t'));
}
if(empty.length){
    console.log('В этих местах сейчас задач нет:\n\t' + empty.sort().join('\n\t'));
}
