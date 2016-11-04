const del = require('del');

function WebpackDelPlugin(options) {
	this.options = options;
};

WebpackDelPlugin.prototype.apply = function (compiler) {
	compiler.plugin('compile', function(params) {
		del.sync(this.options.match);
		console.log('WebpackDelPlugin::Successfully deleted ' + this.options.match + ' assets.\n');
	}.bind(this));
};

module.exports = WebpackDelPlugin;