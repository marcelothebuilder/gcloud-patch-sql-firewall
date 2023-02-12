const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));

function getMandatoryArg(value) {
    if (!argv[value]) {
        console.error(`--${value}=value is mandatory`);
        process.exit(1);
    }

    return argv[value];
}

function getOptionalArg(value, defaultValue) {
    if (!argv[value]) {
        return defaultValue;
    }

    return argv[value];
}

module.exports = {
    getMandatoryArg,
    getOptionalArg
};
