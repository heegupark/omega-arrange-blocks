require('dotenv/config');
require('./db/mongoose');
const commentRouter = require('./routers/comment');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const express = require('express');
const app = express();
app.use(staticMiddleware);
app.use(express.json());
// routing
app.use(commentRouter);
// for error handling
app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('[http] Server listening on port', process.env.PORT);
});