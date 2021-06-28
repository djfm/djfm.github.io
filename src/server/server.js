import path from 'path';
import { URL } from 'url';

import express from 'express';

import webpack from 'webpack';

import createDevMiddleware from 'webpack-dev-middleware';
import createHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../../webpack.config.js';

const webpackCompiler = webpack(webpackConfig);
const devMiddleware = createDevMiddleware(webpackCompiler);
const hotMiddleware = createHotMiddleware(webpackCompiler);

const app = express();

app.use(devMiddleware);
app.use(hotMiddleware);

const dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(
  path.resolve(dirname, '..', '..', 'docs'),
  {
    extensions: ['html'],
  },
));

const port = process.env.port || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server listening on port ${port}`);
});
