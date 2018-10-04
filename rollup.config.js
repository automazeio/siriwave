import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {
	uglify
} from 'rollup-plugin-uglify';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

import pkg from './package.json';

const additional_plugins = [];

if (process.env.NODE_ENV !== 'production') {
	additional_plugins.push(
		serve({
			open: true,
			contentBase: '.'
		})
	);
	additional_plugins.push(
		livereload({
			watch: 'dist'
		})
	);
}

export default [{
		input: 'src/siriwave.js',
		output: {
			file: pkg.browser,
			name: pkg.library,
			format: 'iife'
		},
		plugins: [
			resolve(),
			commonjs(),
			babel({
				exclude: 'node_modules/**'
			})
		].concat(additional_plugins)
	},
	{
		input: 'src/siriwave.js',
		output: {
			file: pkg.browser.replace('.js', '.min.js'),
			name: pkg.library,
			format: 'iife'
		},
		plugins: [
			resolve(),
			commonjs(),
			babel({
				exclude: 'node_modules/**'
			}),
			uglify()
		].concat(additional_plugins)
	},
	{
		input: 'src/siriwave.js',
		output: [{
			file: pkg.module,
			format: 'es'
		}],
		plugins: [
			babel({
				exclude: 'node_modules/**'
			}),
		]
	}
];