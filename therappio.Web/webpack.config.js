const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader'],
            },
            {
                test: /\.module\.(scss|sass|css)$/,
                exclude: /node_modules/,
                loaders: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName:
                                    '[name]_[local]_[hash:base64:5]',
                            },
                            sourceMap: true,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(scss|sass|css)$/,
                exclude: /\.module.(scss|sass|css)$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css', // Production '[name].[hash].css',
            chunkFilename: '[id].css', // Production : '[id].[hash].css'
        }),
        new webpack.DefinePlugin({
            'process.env.API_URL': JSON.stringify(
                'http://165.227.160.211:4000'
                // 'http://localhost:4000'
            ),
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.sass'],
    },
};
