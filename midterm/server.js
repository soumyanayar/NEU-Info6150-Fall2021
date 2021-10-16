const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

app.post('/form', (req, res) => {
  const fields = req.body;
  console.log('server received:');
  console.log(fields);
  res.redirect('/form.html');
});

app.use(express.static('public'));

app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
