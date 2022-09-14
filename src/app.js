const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use('/', express.static(path.join(__dirname, '../dist/')));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.info(`listening at ${PORT}`);
});
