const getVersion = require('./getVersion')();

module.exports = function globalHelp() {
	return `
Usage: i0 <command>

where <command> is one of:
init

i0@${getVersion}
`;
};
