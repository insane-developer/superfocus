var path = require('path');
module.exports = function handle(e, where, what){
    switch(e.type){
        case 'busy':
            console.error('Не могу начать "' + what + '" в "' + path.resolve(where || e.where) + '", пока оно занято "' + e.what + '"');
            break;
        case 'idle':
            console.error('Нет дел в "' + path.resolve(where || e.where) + '"');
            break;
        case 'notfound':
            console.error('Не нашлось "' + path.resolve(where || e.where) + '"');
            break;
        case 'notinindex':
            console.error('Ещё не добавлено в индекс "' + path.resolve(where || e.where) + '"');
            break;
        default:
            console.error(e.stack)
    }
};