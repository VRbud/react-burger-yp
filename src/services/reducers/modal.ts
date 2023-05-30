import { IIngredient } from "../../Types/BurgerConstructorTypes/StoreTypes/IngredientTypes";
import { SET_MODAL_ING, DEL_MODAL_ING, TModalActions } from "../actions/modal";

type TOrderState = {
  currentIngredient: null | IIngredient;
  orderData: null | any;
};

const initialState: TOrderState = {
  currentIngredient: null,
  orderData: null,
};

export const modalReducer = (state = initialState, action: TModalActions) => {
  switch (action.type) {
    case SET_MODAL_ING: {
      return {
        ...state,
        currentIngredient: action.payload,
      };
    }
    case DEL_MODAL_ING: {
      return {
        ...state,
        currentIngredient: null,
      };
    }
    default: {
      return state;
    }
  }
};
