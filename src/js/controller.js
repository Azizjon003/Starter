import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsview from './views/resultsview.js';
import PaginationView from './views/PaginationView.js';
(() => {
  document.querySelector('.search__field').focus();
})();
const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    recipeView.spinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.errorNotify();
  }
};

// console.log(data);
recipeView.addHandleEvent(showRecipe);

// const data = searchView.addHandleEvent();

const cotrolSearch = async function () {
  resultsview.spinner();
  let data = searchView.getValue();
  await model.loadSearchResult(data);
  // const datasearch = model.state.search.results;
  const data1 = model.PaginationFetch();
  PaginationView.render(model.state.search);
  resultsview.rendr(data1);
};

const PaginationController = async function (page) {
  const data1 = model.PaginationFetch(page);
  PaginationView.render(model.state.search);
  resultsview.rendr(data1);
};
PaginationView.addHandleEvent(PaginationController);
// https://forkify-api.herokuapp.com/v2

searchView.addHandleEvent(cotrolSearch);

///////////////////////////////////////
