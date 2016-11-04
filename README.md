# Description
**webpack-del-plugin** usefull if you need remove some files or folders
before compilation processes. This plugin used [del package](https://www.npmjs.com/package/del).

# Usege
1. Clean `dist` folder before compilation bundle:
```javascript
const path = require('path');
const WebpackDelPlugin = require('webpack-del-plugin');
//...

const ROOT_DIR = path.resolve(__dirname);
const DIST_DIR = path.join(ROOT_DIR, 'dist');

module.exports = {
	// ...
	plugins: [
		// ...
		new WebpackDelPlugin({match: path.join(DIST_DIR, '*.*')})
	]
};
```

2. Delete particular files:
```javascript
const path = require('path');
const WebpackDelPlugin = require('webpack-del-plugin');
//...

const ROOT_DIR = path.resolve(__dirname);
const DIST_DIR = path.join(ROOT_DIR, 'dist');

module.exports = {
	// ...
	plugins: [
		// ...
		new WebpackDelPlugin({
			match: [
				path.join(DIST_DIR, 'file1.js'),
				path.join(DIST_DIR, 'file2.js')
			]
		})
	]
};
```

For more information see [del package](https://www.npmjs.com/package/del) documentation.