const packageJson = require('../package.json');

module.exports = function getVersion() {
	return packageJson.version;
};
