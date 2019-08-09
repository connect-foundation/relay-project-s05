const express = require('express');
const bodyParser = require('body-parser');
const recipes = require('./logic/recipe.json');
const logic = require('./logic/logic.js');
const app = express();

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));

app.get('/', function(req, res) {
  res.render('index.html');
});
app.get('/jaeryo', function(req, res) {
  res.render('JaeRyo.html');
});
app.get('/theme', function(req, res) {
  res.render('Theme.html');
});
app.post('/chuchun', function(req, res) {
  let result = logic.getMaximumMatches(Object.values(req.body), recipes);
  res.render('ChuChun', {
    list: result
  });
});

app.get('/recipe', function(req, res) {
  let result = recipes.reduce((acc, cur) => {
    if (cur.theme === req.query.theme) {
      acc.push(cur);
    }
    return acc;
  }, []);
  res.render('Recipe', {
    list: result,
    theme: req.query.theme
  });
});

app.listen(3000, function() {
  console.log('Express server has started on port 3000');
});
