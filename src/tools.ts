export function logger (func: Function) {
        return (...args) => {
            try {
            const date = new Date()
            const fs = require('fs');
            const dir = './logs';

            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            const fileName = `${dir}/logs-${date.getFullYear()}${date.getMonth()}${date.getDate()}.txt`
            const req = [...args][0]
            let argText = '\turl: ' + req.url + '\n' 
            + '\tbody: ' + JSON.stringify(req.body) + '\n'
            + '\tparams: ' + JSON.stringify(req.params) + '\n';
            fs.appendFile(
                fileName, 
                `${new Date().toString()}` + ': \n\t'+
                 'name: '+func.name.toString() + '\n' + argText, 
                function (err) {
            if (err) throw err;
            });}
            catch (error) {
                console.log(error)
            }
            
        return func(...args)
    }
}