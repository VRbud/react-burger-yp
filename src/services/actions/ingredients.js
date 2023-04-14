import { fetchData } from "../api/api";

const REQUEST_INGREDIENTS = 'REQUEST_INGREDIENTS';
const REQUEST_INGREDIENTS_FAILED = 'REQUEST_INGREDIENTS_FAILED';
const REQUEST_INGREDIENTS_SUCCESS = 'REQUEST_INGREDIENTS_SUCCESS';

const ADD_TO_CART = 'ADD_TO_CART';
const ADD_BUN_TO_CART = 'ADD_BUN_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';



export const getIngredients = () => {
  return function (dispatch) {
    dispatch({
      type: REQUEST_INGREDIENTS
    })
    fetchData().then(res => {
      if (res) {
        dispatch({
          type: REQUEST_INGREDIENTS_SUCCESS,
          ingredients: res
        });
      } else {
        dispatch({
          type: REQUEST_INGREDIENTS_FAILED
        });
      }
    });



  }
}
export { REQUEST_INGREDIENTS, REQUEST_INGREDIENTS_FAILED, REQUEST_INGREDIENTS_SUCCESS, ADD_TO_CART, REMOVE_FROM_CART, ADD_BUN_TO_CART }