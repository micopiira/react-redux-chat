const lint = require('mocha-eslint');

const paths = [
	'src'
];

const options = {
	formatter: 'stylish',
	alwaysWarn: false,
	timeout: 5000,
	slow: 1000,
	strict: true
};

lint(paths, options);