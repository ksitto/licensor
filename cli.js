var program = require('commander');
var fs = require('fs');
var licensor = require('./licensor');      


program
    .arguments('<cmd> [secret] [file]')
    .action(function(cmd, secret, file) {                
        var l = new licensor(secret);
        switch(cmd) {
            case 'generate':
                const data = JSON.parse(fs.readFileSync(file));
                l.generateLicense(data, function(license) {                    
                    console.log(JSON.stringify(license, null, 2));
                })
                break;
            case 'verify':
                const license = JSON.parse(fs.readFileSync(file));
                l.verifyLicense(license, function(result) {
                    console.log(result);
                })
                break;
            default:
                console.log('ERROR, invalid command: ' + cmd)
                break;
        }
    })
    .parse(process.argv);