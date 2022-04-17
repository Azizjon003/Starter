import { async } from 'regenerator-runtime';
import { API_URL, STEP } from './config';
import { getJSON } from './helper';
console.log(STEP);
export const state = {
  recipe: {},
  search: {
    results: {},
    page: 1,
    step: STEP,
  },
};
export const loadRecipe = async function (id) {
  try {
    const jSON = await getJSON(API_URL + id);
    const obj = jSON.data.recipe;
    state.recipe = {
      id: obj.id,
      name: obj.title,
      time: obj.cooking_time,
      image: obj.image_url,
      publisher: obj.publisher,
      servings: obj.servings,
      url: obj.source_url,
      ingredients: obj.ingredients,
    };
  } catch (err) {
    throw err;
  }
};
export const loadSearchResult = async function (food) {
  try {
    const data = await getJSON(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${food}`
    );
    // console.log(data);
    state.search.results = data.data.recipes.map(item => {
      return {
        img: item.image_url,
        title: item.title,
        id: item.id,
        publisher: item.publisher,
      };
    });
    console.log(state.search.results);
  } catch (err) {
    console.log(err);
  }
};
export const PaginationFetch = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.step;
  const end = page * state.search.step;
  return state.search.results.slice(start, end);
};
