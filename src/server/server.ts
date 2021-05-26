import path from 'path';

import express from 'express';

const app = express();

app.use(express.static(
  path.resolve(__dirname, '..', '..', 'docs')
));

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
