
module.exports = function (app) {
    const logic = require("../logic/logic.js")
    const recipes = require('../logic/recipe.json');

    const bodyParser = require("body-parser");

    /** bodyParser.urlencoded(options)
     * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
     * and exposes the resulting object (containing the keys and values) on req.body
     */
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    /**bodyParser.json(options)
     * Parses the text as JSON and exposes the resulting object on req.body.
     */
    app.use(bodyParser.json());

    app.get('/', function (req, res) {
        res.render('index.html')
    });
    app.get('/jaeryo', function (req, res) {
        res.render('JaeRyo.html')
    });
    app.get('/theme', function (req, res) {
        res.render('Theme.html')
    });
    app.post("/chuchun", function (req, res) {
        let result = logic.getMaximumMatches(Object.values(req.body), recipes)
        res.render('ChuChun', {
            list: result
        });
    });

    app.get("/recipe", function (req, res) {
        let result = recipes.reduce((acc, cur) => {
            if (cur.theme === req.query.theme) {
                acc.push(cur);
            }
            return acc;
        }, [])
        res.render('Recipe', {
            list: result,
            theme: req.query.theme
        });
    });

}