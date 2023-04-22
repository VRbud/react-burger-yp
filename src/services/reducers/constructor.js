import {
  ADD_TO_CART,
  ADD_BUN_TO_CART,
  SORT_CART,
} from "../actions/constructor";

const initialState = {
  cart: [],
  bun: null,
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    }
    case ADD_BUN_TO_CART: {
      return {
        ...state,
        bun: action.payload,
      };
    }
    case SORT_CART: {
      return {
        ...state,
        cart: [
          ...state.cart
            .toSpliced(action.dragIndex, 1)
            .toSpliced(action.hoverIndex, 0, state.cart[action.dragIndex]),
        ],
      };
    }

    default: {
      return state;
    }
  }
};
