var fs = require('fs');

function getUserHome() {
    return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

var localConfigPath = getUserHome() + '/sktcargo-config.json';
// var projectConfigPath = __dirname + '/sktcargo-config.json';
var projectConfigPath = __dirname + '/config.json';

if(process.env.NODE_ENV === "test") {
    projectConfigPath = __dirname + '/test_config.json';
}

var selectedConfigPath = localConfigPath;

if(fs.existsSync(localConfigPath)) {
    selectedConfigPath = localConfigPath;
    console.log("loading from "+ localConfigPath)
} else if (fs.existsSync(projectConfigPath)) {
    selectedConfigPath = projectConfigPath;
    console.log("loading from "+ projectConfigPath)
} else {
    console.log('CONFIG FILE DOESNT EXIST @ ' + localConfigPath);
    process.exit();
}

var finalJSONConfig = JSON.parse(fs.readFileSync(selectedConfigPath));

// if(!finalJSONConfig.googleSecretKeyLimit) {
//     console.log('googleSecretKeyLimit DOESNT EXIST');
//     process.exit();
// }

module.exports = finalJSONConfig;

