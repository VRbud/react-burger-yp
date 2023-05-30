import { IIngredient } from "../../Types/BurgerConstructorTypes/StoreTypes/IngredientTypes";
import {
  REQUEST_INGREDIENTS,
  REQUEST_INGREDIENTS_FAILED,
  REQUEST_INGREDIENTS_SUCCESS,
  TIngredientsActions,
} from "../actions/ingredients";

type TIngredientsState = {
  ingredients: null | IIngredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
};

const initialState: TIngredientsState = {
  ingredients: null,
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions
): TIngredientsState => {
  switch (action.type) {
    case REQUEST_INGREDIENTS: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case REQUEST_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.ingredients,
        ingredientsRequest: false,
      };
    }
    case REQUEST_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
