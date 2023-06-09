import { IIngredient } from "../../Types/BurgerConstructorTypes/StoreTypes/IngredientTypes";
import {
  ADD_TO_CART,
  ADD_BUN_TO_CART,
  SORT_CART,
  DELETE_FROM_CART,
  TConstructorActions,
} from "../actions/constructor";

export type TConstructoreState = {
  cart: IIngredient[];
  bun: IIngredient | null;
};

const initialState: TConstructoreState = {
  cart: [],
  bun: null,
};

export const constructorReducer = (
  state = initialState,
  action: TConstructorActions
): TConstructoreState => {
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
            // disable toSpliced types
            // @ts-ignore
            .toSpliced(action.dragIndex, 1)
            .toSpliced(action.hoverIndex, 0, state.cart[action.dragIndex]),
        ] as IIngredient[],
      };
    }
    case DELETE_FROM_CART: {
      return {
        ...state,
        // disable toSpliced types
        // @ts-ignore
        cart: [...state.cart.toSpliced(action.ing, 1)] as IIngredient[],
      };
    }

    default: {
      return state;
    }
  }
};
