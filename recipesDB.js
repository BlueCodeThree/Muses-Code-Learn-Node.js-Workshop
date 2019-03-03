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

  function updateRecipe(recipe){
    db.get('recipes')
      .find({id: recipe.id})
      .assign({ name: recipe.name, content: recipe.content})
      .write();
  }


  // gets the biggest ID no. and adds one to it. 
  function getNextId(){
    var recipeWithBiggestId = db.get('recipes').maxBy(function(recipe){ 
      return recipe.id; 
    });
    return recipeWithBiggestId.value().id+1;
  }

  // function to add a new recipe
  function addRecipe(recipe){
    var newRecipe = {
      id: getNextId(),
      name: recipe.name,
      content: recipe.content
    };
    db.get('recipes')
      .push(newRecipe)
      .write();
  }

  // function to delete a recipe
  function deleteRecipe(id){
    db.get('recipes')
      .remove({id: parseInt(id)})
      .write();
  }

  module.exports = {
    getAllRecipes: getAllRecipes,
    getRecipe: getRecipe,
    updateRecipe: updateRecipe,
    addRecipe: addRecipe,
    deleteRecipe: deleteRecipe
  };