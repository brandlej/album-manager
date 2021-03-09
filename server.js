const Page1 = require('./src/fixtures/page1.json');
const Page2 = require('./src/fixtures/page2.json');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/albums', (req, res) => {
  res.send([...Page1.results, ...Page2.results]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));