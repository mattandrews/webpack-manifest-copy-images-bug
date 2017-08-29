const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './input/js/main.js'
    },
    output: {
        filename: 'out.[hash:8].js',
        path: path.resolve(__dirname, 'output'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[hash:8].[ext]',
                            context: path.resolve(__dirname, 'input')
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new ExtractTextPlugin("css/styles.[hash:8].css"),
        new CopyWebpackPlugin([{
            from: 'images',
            to: 'images/[name].[hash:8].[ext]',
            context: path.resolve(__dirname, 'input')
        }]),
        new ManifestPlugin({
            fileName: 'manifest.json',
            basePath: '',
            writeToFileEmit: true
        }),
        new CleanWebpackPlugin(['output'])
    ]
};