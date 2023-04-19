import { requestToServ } from "../api/api";

const REQUEST_INGREDIENTS = 'REQUEST_INGREDIENTS';
const REQUEST_INGREDIENTS_FAILED = 'REQUEST_INGREDIENTS_FAILED';
const REQUEST_INGREDIENTS_SUCCESS = 'REQUEST_INGREDIENTS_SUCCESS';

const ADD_TO_CART = 'ADD_TO_CART';
const ADD_BUN_TO_CART = 'ADD_BUN_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const SORT_CART = 'SORT_CART';

const SET_MODAL_ING = 'SET_MODAL_ING';
const DEL_MODAL_ING = 'SET_MODAL_ING';

const SET_ORDER_DATA = 'SET_ORDER_DATA';
const SET_ORDER_DATA_SUCCESS = 'SET_ORDER_DATA_SUCCESS';
const SET_ORDER_DATA_FAILED = 'SET_ORDER_DATA_FAILED';

export const getIngredients = () => {
  return function (dispatch) {
    dispatch({
      type: REQUEST_INGREDIENTS
    })
    requestToServ('ingredients').then(res => {
      if (res) {
        dispatch({
          type: REQUEST_INGREDIENTS_SUCCESS,
          ingredients: res.data
        });
      } else {
        dispatch({
          type: REQUEST_INGREDIENTS_FAILED
        });
      }
    });
  }
}

export const sendOrderData = (data) => {
  return function (dispatch) {
    dispatch({
      type: SET_ORDER_DATA
    })
    requestToServ('orders', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    }).then(res => {
      if (res) {
        dispatch({
          type: SET_ORDER_DATA_SUCCESS,
          orderData: res,
        });
      } else {
        dispatch({
          type: SET_ORDER_DATA_FAILED
        });
      }

    });

  }
}


export { REQUEST_INGREDIENTS, REQUEST_INGREDIENTS_FAILED, REQUEST_INGREDIENTS_SUCCESS, ADD_TO_CART, REMOVE_FROM_CART, ADD_BUN_TO_CART, SET_MODAL_ING, DEL_MODAL_ING, SET_ORDER_DATA, SET_ORDER_DATA_SUCCESS, SET_ORDER_DATA_FAILED, SORT_CART }