import path from 'path';

import {
  EnvironmentPlugin,
  HotModuleReplacementPlugin,
} from 'webpack';

import MiniCSSExtractPlugin from 'mini-css-extract-plugin';

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

import CompressionPlugin from 'compression-webpack-plugin';

const babelLoaderPlugins = [];
const plugins = [];

type Mode = 'production' | 'development' | 'none';

const mode: Mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

plugins.push(new MiniCSSExtractPlugin());
plugins.push(new EnvironmentPlugin({
  NODE_ENV: mode,
}));

const entry = {
  bundle: [
    './src/client/index.tsx',
  ],
  style: './node_modules/highlight.js/scss/github-dark.scss',
};

if (mode === 'development') {
  entry.bundle.push('webpack-hot-middleware/client');
  babelLoaderPlugins.push(require.resolve('react-refresh/babel'));
  plugins.push(new HotModuleReplacementPlugin());
  plugins.push(new ReactRefreshWebpackPlugin());
} else {
  plugins.push(new CompressionPlugin({
    test: /\.js$/,
  }));
}

export default {
  devtool: 'source-map',
  entry,
  mode,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs'),
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
    }, {
      test: /\.s[ac]ss$/i,
      use: [
        MiniCSSExtractPlugin.loader,
        'css-loader',
        'sass-loader',
      ],
    }],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins,
};
