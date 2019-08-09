const express = require('express');
const bodyParser = require('body-parser');
const recipes = require('./logic/recipe.json');
const logic = require('./logic/logic.js');
const app = express();
const replyObj = {};

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));

app.get('/', function(req, res) {
  res.render('index');
});
app.get('/jaeryo', function(req, res) {
  res.render('jaeryo');
});
app.get('/theme', function(req, res) {
  res.render('theme');
});

app.post('/chuchun', function(req, res) {
  let result = logic.getMaximumMatches(Object.values(req.body), recipes);

  res.render('recommend', {
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

  res.render('recipe', {
    list: result,
    theme: req.query.theme,
    replyObj
  });
});

app.post('/reply/:menu', (req, res) => {
  const content = req.body.content;
  const menu = req.params.menu;

  if (!replyObj[menu]) {
    replyObj[menu] = [];
  }
  replyObj[menu].push({
    content,
    postedAt: getDate()
  });
  return res.status(201).json({ menu, content });
});

app.use((req, res, next) => {
  res.status(404).end('404 NOT FOUND');
});

app.listen(3000, function() {
  console.log('Express server has started on port 3000');
});

const getDate = () => {
  const date = new Date();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + (date.getDate() + 1)).slice(-2);
  const hour = ('0' + date.getHours()).slice(-2);
  const min = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  const yyyymmdd = `${date.getFullYear()}-${month}-${day}`;
  const hhmmss = `${hour}:${min}:${seconds}`;
  return `${yyyymmdd} ${hhmmss}`;
};
