
import { REQUEST_INGREDIENTS, REQUEST_INGREDIENTS_FAILED, REQUEST_INGREDIENTS_SUCCESS, ADD_TO_CART, ADD_BUN_TO_CART, SET_MODAL_ING, DEL_MODAL_ING, SET_ORDER_DATA, SET_ORDER_DATA_SUCCESS, SET_ORDER_DATA_FAILED, SORT_CART } from '../actions/ingredients'

const initialState = {
  ingredients: [],
  cart: [],
  bun: {},
  totalCart: [],

  currentIngredient: {},

  ingredientsRequest: false,
  ingredientsFailed: false,

  orderRequest: false,
  orderFailed: false,
  orderData: {},
}

export const ingredientsReducer = (state = initialState, action) => {
  if (action.type === DEL_MODAL_ING) {
    return {
      ...state,
      currentIngredient: {},
      orderData: {}
    }

  }
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
    case SORT_CART: {
      return {
        ...state,
        cart: action.cart
      }
    }
    case SET_MODAL_ING: {
      return {
        ...state,
        currentIngredient: action.payload
      }
    }
    case DEL_MODAL_ING: {
      return {
        ...state,
        currentIngredient: {},
        orderData: action.payload,
      }
    }
    case SET_ORDER_DATA: {
      return {
        ...state,
        orderRequest: true
      }
    }
    case SET_ORDER_DATA_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderData: action.orderData,
      }
    }
    case SET_ORDER_DATA_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      }
    }

    default: {
      return state
    }
  }
}




