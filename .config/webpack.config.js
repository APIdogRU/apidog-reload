const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.ENV === 'production';

const mode = isProduction ? 'production' : 'development';

const authDir = 'auth';
const buildDir = 'build';

module.exports = {
    mode,

    entry: {
        auth: path.resolve('src', authDir, 'index.tsx'),
        main: path.resolve('src', 'index.tsx'),
    },

    output: {
        path: path.resolve(buildDir),
        filename: '[name].js'
    },

    devServer: {
        contentBase: path.resolve(buildDir),
        host: '0.0.0.0',
        port: 8080,
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
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],

            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                exclude: /(node_modules)/,
                use: ['file-loader'],
            },
        ],
    },

    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },

    optimization: {
        minimize: isProduction,
        minimizer: [new TerserPlugin()],
    },

    externals: {
        'react': 'React',
        'react-dom' : 'ReactDOM'
    },

    plugins: [
        new webpack.EnvironmentPlugin({
            VERSION: process.env.npm_package_version,
            BUILD_DATE: (d => `${d.getFullYear()}${('00'+(d.getMonth()+1)).slice(-2)}${('00'+d.getDate()).slice(-2)}`)(new Date())
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve('public', 'index.html'),
            chunks: ['main'],
            minify: true,
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve('public', authDir, 'index.html'),
            chunks: [authDir],
            minify: true,
            filename: 'auth.html'
        })
    ],

    stats: {
        children: false,
    },
};
