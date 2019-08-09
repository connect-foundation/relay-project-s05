// recipe.json 파일에서 읽어들어온 레시피 정보
const recipes = require('./recipe.json');

const getAllIngredient = function(recipes) {
  return recipes.reduce((acc, val) => {
    acc = [...acc, ...val.ingredients];
    return acc;
  }, []);
};

const SavetoFile = function(path, recipes) {};

const addRecipes = function(addObject, recipes) {
  return [...recipes, addObject];
};

const calculateCount = function(current, menu) {
  let count = 0;
  for (let ingredient of current) {
    if (menu.ingredients.includes(ingredient)) {
      count++;
    }
  }
  menu.matchsize = count;
  return menu;
};

const getMaximumMatches = function(current, recipes) {
  recipes = recipes.reduce((acc, obj) => {
    acc.push(calculateCount(current, obj));
    return acc;
  }, []);

  recipes = recipes.sort((a, b) => {
    return a.matchsize < b.matchsize;
  });

  return recipes.length >= 6 ? recipes.slice(0, 1) : recipes;
};

module.exports = {
  getMaximumMatches,
  calculateCount
};
