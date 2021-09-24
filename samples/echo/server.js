const express = require('express');
const app = express();
app.set('port', process.env.PORT || 3000);

const path = require('path');
const exphbs = require('express-handlebars'); // ugly variable name per lib docs

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

const options = {
  dotfiles: 'ignore',
  index: 'index.html',
};

app.use(express.static(path.join(__dirname, 'public') , options  ));

app.get('/', (req, res) => {
  res.send('okay');
});

app.get('/echo', (req, res) => {
  res.send('You sent a form with the default GET method, you should be using a POST method');
});

app.post('/echo', express.urlencoded({extended: false}), (req, res) => {
  const fields = req.body;
  res.render('echo', { fields });
});

app.listen(app.get('port'),  () => {
  console.log(`Started on http://localhost:${app.get('port')}`);
});
