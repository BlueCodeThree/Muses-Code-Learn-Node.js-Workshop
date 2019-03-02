var express = require('express');
var express = require('express');
var getAllRecipes = require('./recipesDB.js').getAllRecipes;
var getRecipe = require('./recipesDB.js').getRecipe;
var server = express();


var staticAssets = express.static('public');
server.use(staticAssets);

server.set('view engine', 'ejs');

server.get('/hello', function(request, response) {
    response.send('hello there');
});

server.get('/morning', function(request, response) {
    response.send('Good Morning! How are you?');
});

  
    
server.get('/about', function(request, response) {
    response.render('pages/about');
});

server.get('/recipe/:id', function(request, response) {
    var recipe = getRecipe(request.params.id);
    response.render('pages/recipe', { recipe: recipe });
  });

   server.get('/', function(request, response) {
    var recipes = getAllRecipes();
    response.render('pages/index', { recipes: recipes });
  });

  server.get('/carlie', function(request, response) {
      response.send("Carlie, you are doing amazing here")
  })

server.listen(3000, function () {
    console.log('Server has started listening on port 3000.');
});



