import path from 'path';
import { URL } from 'url';

import webpack from 'webpack';

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ReactRefreshBabel from 'react-refresh/babel.js';

import CompressionPlugin from 'compression-webpack-plugin';

const babelLoaderPlugins = [];
const plugins = [];

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const entry = [
  '@babel/polyfill',
  './src/client/index.tsx',
];

if (mode === 'development') {
  entry.push('webpack-hot-middleware/client');
  babelLoaderPlugins.push(ReactRefreshBabel);
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new ReactRefreshWebpackPlugin());
} else {
  plugins.push(new CompressionPlugin({
    test: /\.js$/,
  }));
}

const dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  devtool: 'source-map',
  entry,
  mode,
  output: {
    filename: 'bundle.js',
    path: path.resolve(dirname, 'docs'),
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          plugins: babelLoaderPlugins,
        },
      }, {
        loader: 'ts-loader',
      }],
    }],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins,
};
