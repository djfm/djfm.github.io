/* eslint-disable no-console */
import path from 'path';
import { stat } from 'fs/promises';

import express from 'express';

import webpack from 'webpack';

import createDevMiddleware from 'webpack-dev-middleware';
import createHotMiddleware from 'webpack-hot-middleware';
import { ICompiler } from 'webpack-hot-middleware/node_modules/@types/webpack';

// eslint-disable-next-line import/extensions
import webpackConfig from '../../webpack.config';

const app = express();

const mode = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'development';

console.log(`Starting server in "${mode}" mode.`);

if (mode === 'production') {
  console.log(
    'Please ensure that you have run',
    '"yarn build" before running the server,',
    'as in production the server',
    'will not compile your files',
  );
}

if (mode === 'development') {
  const webpackCompiler = webpack(webpackConfig);
  const devMiddleware = createDevMiddleware(webpackCompiler);
  const hotMiddleware = createHotMiddleware(webpackCompiler as unknown as ICompiler);
  app.use(devMiddleware);
  app.use(hotMiddleware);
}

const publicDir = path.resolve(__dirname, '..', '..', 'docs');

// this is because express.static
// seems to fuck up on urls like "/dir/"
// where dir is a directory and "/dir.html"
// exists.
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
  console.log(`server listening on port ${port}`);
});
