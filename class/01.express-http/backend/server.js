import express from 'express';
  const app = express();
  const port = process.env.PORT || 4000;
  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
  app.get('/', (req, res) => {
    res.send('Received a GET HTTP method');
  });
  app.post('/', (req, res) => {
    res.send('Received a POST HTTP method');
  });
    app.put('/', (req, res) => {
      res.send('Received a PUT HTTP method');
  });
    app.delete('/', (req, res) => {
      res.send('Received a DELETE HTTP method');
  });


  app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
);