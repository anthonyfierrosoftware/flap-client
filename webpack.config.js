const path = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const API_SERVER_LOCATION = 'http://localhost:5000';

module.exports = function generateConfig(options) {
  const publicPath = `/${options.repo_name ?? ''}`;

  const config = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
      app: ['@babel/polyfill', './src/index'],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      alias: {
        'subscribe-ui-event': 'subscribe-ui-event/index.js',
        '~': path.join(__dirname, 'node_modules'),
      },
      mainFields: ['browser', 'main', 'module'],
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: publicPath,
      filename: '[name].js',
      sourceMapFilename: '[name].js',
      hashFunction: 'sha256',
      globalObject: `(typeof self !== 'undefined' ? self : this)`,
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: { sourceMap: true },
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    devServer: {
      port: 8080,
      static: {
        directory: 'build',
      },
      proxy: {
        '/api/*': {
          target: API_SERVER_LOCATION,
        },
      },
      allowedHosts: 'all',
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          use: 'babel-loader',
          include: [path.resolve(__dirname, 'src')],
        },
        {
          test: /\.ya?ml$/,
          use: ['json-loader', 'yaml-loader'],
        },
        {
          test: /\.s(a|c)ss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
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
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.md$/,
          use: 'raw-loader',
        },
        {
          test: /\.(jpe?g|gif|png|svg|woff2?|ttf|eot)(\?.*)?$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].style.css',
        chunkFilename: '[id].style.css',
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.ejs',
        filename: 'index.html',
        inject: true,
        chunks: ['vendor', 'app', 'manifest'],
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /regenerator|nodent|js-beautify/,
        contextRegExp: /ajv/,
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: false,
        debug: true,
        options: {
          sassLoader: {
            includePaths: [path.resolve(__dirname, 'src')],
            sourceMap: true,
          },
          context: '/',
        },
      }),
      new SimpleProgressWebpackPlugin({
        format: 'minimal',
      }),
    ],
  };

  return config;
};
