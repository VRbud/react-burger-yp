
import { REQUEST_INGREDIENTS, REQUEST_INGREDIENTS_FAILED, REQUEST_INGREDIENTS_SUCCESS } from '../actions/ingredients'

const initialState = {
  ingredients: null,
  ingredientsRequest: false,
  ingredientsFailed: false,
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
        ingredientsFailed: false,
        ingredients: action.ingredients,
        ingredientsRequest: false
      }
    }
    case REQUEST_INGREDIENTS_FAILED: {
      return {
        ...state, ingredientsFailed: true, ingredientsRequest: false
      }
    }
    default: {
      return state
    }
  }
}