import path from 'path';
import { stat } from 'fs/promises';

import express from 'express';

import webpack from 'webpack';

import createDevMiddleware from 'webpack-dev-middleware';
import createHotMiddleware from 'webpack-hot-middleware';
import { ICompiler } from 'webpack-hot-middleware/node_modules/@types/webpack';

// eslint-disable-next-line import/extensions
import webpackConfig from '../../webpack.config';

const webpackCompiler = webpack(webpackConfig);
const devMiddleware = createDevMiddleware(webpackCompiler);
const hotMiddleware = createHotMiddleware(webpackCompiler as unknown as ICompiler);

const app = express();

app.use(devMiddleware);
app.use(hotMiddleware);

const publicDir = path.resolve(__dirname, '..', '..', 'docs');

app.use(async (req, res, next): Promise<void> => {
  const candidatePath = `${
    path.resolve(publicDir, req.path.slice(1))
  }.html`;
  try {
    const s = await stat(candidatePath);
    if (!s.isFile()) {
      next();
      return;
    }
    res.sendFile(candidatePath);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
    next();
  }
});

app.use(express.static(publicDir, {
  extensions: ['html'],
}));

const port = process.env.port || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server listening on port ${port}`);
});
