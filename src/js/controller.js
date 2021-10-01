import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchViews.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // load recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResult(query);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  recipeView.addHandlerRenderer(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
