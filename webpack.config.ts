import path from 'path';

export default {
  devtool: 'source-map',
  entry: './src/client/index.tsx',
  mode: 'production',
  output: {
    filename: 'bundle.js',
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
          plugins: [],
        },
      }, {
        loader: 'ts-loader',
      }],
    }],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
}
