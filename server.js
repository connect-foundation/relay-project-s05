const express = require('express');
const bodyParser = require('body-parser');
const recipes = require('./logic/recipe.json');
const logic = require('./logic/logic.js');
const app = express();
const replyObj = {
  스테이크: [
    {
      content: '123',
      postedAt: new Date()
    },
    {
      content: '456',
      postedAt: new Date()
    }
  ]
};

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
    postedAt: new Date()
  });

  return res.status(201).json({ menu, content });
});

app.use((req, res, next) => {
  res.status(404).end('404 NOT FOUND');
});

app.listen(3000, function() {
  console.log('Express server has started on port 3000');
});
