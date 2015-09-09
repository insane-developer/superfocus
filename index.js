var fs = require('fs'),
    path = require('path'),
    CONFIG = path.join(process.env.HOME, '.superfocus.json'),
    config;

module.exports = {
    begin: function(where, what, force){
        var config = readConfig();
        where = resolveTarget(where);

        if(!force && where in config && config[where] !== null){
            throw {
                type: 'busy',
                what: config[where],
                where: where
            };
        }
        config[where] = what;
        writeConfig(config);
    },
    end: function(where){
        var config = readConfig();
        where = resolveTarget(where);

        if(!(where in config) || config[where] === null){
            throw {
                type: 'idle',
                what: config[where],
                where: where
            };
        }
        config[where] = null;
        writeConfig(config);
    },
    erase: function(where){
        var undef;
        var config = readConfig();
        where = resolveTarget(where);

        if(!(where in config)){
            throw {
                type: 'notinindex',
                where: where
            };
        }
        config[where] = undef;
        writeConfig(config);
    },
    what: function(where){
        var config = readConfig();
        where = resolveTarget(where);
        return config[where];
    },
    recursiveWhat: function(where){
        var result;
        where = resolveTarget(where);

        while(where !== '/'){
            result = this.what(where);
            if(result === null){
                throw {
                    type: 'idle',
                    where: where,
                    what: result
                };
            }else if(result !== undefined){
                return result;
            }else {
                where = path.dirname(where);
            }
        }
        throw {
            type: 'notinindex',
            where: where
        }
    },
    list: function(){
        return readConfig();
    }
};

function resolveTarget(where){
    where = path.resolve(where);
    if(!fs.existsSync(where)){
        throw {
            type: 'notfound',
            where: where
        };
    }
    where = fs.realPathSync(where);
    return where;
}

function readConfig(){
    if(config){
        return config;
    }
    if(!fs.existsSync(CONFIG)){
        return (config = {});
    }
    return (config = JSON.parse(fs.readFileSync(CONFIG, 'utf-8')));
}

function writeConfig(config){
    return fs.writeFileSync(CONFIG, JSON.stringify(config), 'utf-8');
}