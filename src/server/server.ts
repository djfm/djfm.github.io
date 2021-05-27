import path from 'path';

import express from 'express';

import webpack from 'webpack';

import createDevMiddleware from 'webpack-dev-middleware';
import createHotMiddleWare from 'webpack-hot-middleware';

// eslint-disable-next-line import/extensions
import webpackConfig from '../../webpack.config';

const webpackCompiler = webpack(webpackConfig);
const devMiddleware = createDevMiddleware(webpackCompiler);
const hotMiddleware = createHotMiddleWare(webpackCompiler);

const app = express();

app.use(devMiddleware);
app.use(hotMiddleware);

app.use(express.static(
  path.resolve(__dirname, '..', '..', 'docs'),
));

const port = process.env.port || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server listening on port ${port}`);
});
