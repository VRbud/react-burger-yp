
import { REQUEST_INGREDIENTS, REQUEST_INGREDIENTS_FAILED, REQUEST_INGREDIENTS_SUCCESS, ADD_TO_CART, ADD_BUN_TO_CART } from '../actions/ingredients'

const initialState = {
  ingredients: [],
  cart: [],
  bun: {},
  totalCart: [],
  modalObj: {},
  ingredientsRequest: false,
  ingredientsfailed: false,
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_INGREDIENTS: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case REQUEST_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsfailed: false,
        ingredients: action.ingredients,
        ingredientsRequest: false
      }
    }
    case REQUEST_INGREDIENTS_FAILED: {
      return {
        ...state, ingredientsfailed: true, ingredientsRequest: false
      }
    }
    case ADD_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    }
    case ADD_BUN_TO_CART: {
      return {
        ...state,
        bun: action.payload
      }
    }

    default: {
      return state
    }
  }
}




