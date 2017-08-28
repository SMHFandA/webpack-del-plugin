const del = require('del');

const ALIAS__BEFORE_COMPILATION = 'before-compilation';
const ALIAS__AFTER_COMPILATION = 'after-compilation';

function WebpackDelPlugin(options) {
	this.options = options;
};

WebpackDelPlugin.prototype.apply = function (compiler) {
	if (!isValidOptions(this.options)) {
		return;
	}

	if (Array.isArray(this.options)) {
		for (var i = 0; i < this.options.length; i++) {
			handleHook.call(this, compiler, this.options[i]);
		}
	} else if (typeof this.options === 'object') {
		handleHook.call(this, compiler, this.options);
	}
};

function handleHook(compiler, option) {
	const hook = resolveWhen(option.when);
	compiler.plugin(hook, function(params) {
		del.sync(option.what);
		log(option.when, 'Successfully deleted ' + option.what + ' assets.\n');
	});
}

function log(type, msg) {
	let collor = null;
	switch (type) {
		case 'warning':
			collor = '\x1b[33m%s\x1b[0m'
			break;

		case 'success':
			collor = '\x1b[32m%s\x1b[0m';
			break;

		case 'error':
			collor = '\x1b[31m%s\x1b[0m';
			break;

		default:
			collor = '\x1b[34m%s\x1b[0m';
			break;
	}
	console.error(collor, 'WebpackDelPlugin::'+ type + ': ' + msg);
}

function isValidOption(option) {
	if (typeof option !== 'object') {
		log('error', 'Specified option' + option + ' must be object type.');
		return false;
	}

	if (!option.what || !option.when) {
		log('error', 'Specified option\n' + JSON.stringify(option, null, 2) + '\nmust have fields "what" and "when".')
		return false;
	}

	return true;
}

function isValidOptions(options) {
	if (Array.isArray(options)) {
		return options.reduce(function(isValid, option) {
			return isValid && isValidOption(option);
		}, true);
	} else if (typeof options === 'object') {
		return isValidOption(options);
	}

	return false
}

function resolveWhen(alias) {
	switch (alias) {
		case ALIAS__BEFORE_COMPILATION:
			return 'compile';

		case ALIAS__AFTER_COMPILATION:
			return 'done';

		default:
			return 'compile';
	}
}

module.exports = WebpackDelPlugin;