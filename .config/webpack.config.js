const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const allowedModes = ['production', 'development'];
const mode = allowedModes.includes(process.env.ENV) ? process.env.ENV : 'development';

const buildDir = 'build';

module.exports = {
    mode,

	entry: {
        auth: path.resolve('src', 'auth', 'index.tsx'),
		main: path.resolve('src', 'index.tsx'),
    },

	output: {
		path: path.resolve(buildDir),
		filename: '[name].bundle.js',
    },

	devServer: {
		contentBase: path.resolve(buildDir),
    },

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.s?css$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
    },

	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ],
    },

	plugins: [
		new webpack.EnvironmentPlugin({
			VERSION: process.env.npm_package_version
		}),
		new HtmlWebpackPlugin({
			template: path.resolve('public', 'index.html'),
			chunks: ['main'],
			minify: true,
			filename: 'index.html'
		}),
		new HtmlWebpackPlugin({
			template: path.resolve('public', 'auth', 'index.html'),
			chunks: ['auth'],
			minify: true,
			filename: 'login.html'
		})
	]
};