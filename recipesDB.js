var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('recipesDB.json');
var db = low(adapter);

db.defaults({
    recipes: [
      {
        id: 1,
        name: 'Traditional Cupcakes',
        content: 'content goes here'
      }
    ]
  }).write();

  function getAllRecipes(){
    var recipes = db.get('recipes').value();
    return recipes;
  }

  function getRecipe(id){
    var recipe = db.get('recipes').find({id: parseInt(id) }).value();
    return recipe;
  }

  module.exports = {
    getAllRecipes: getAllRecipes,
    getRecipe: getRecipe,
  };