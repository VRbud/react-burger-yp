import { IIngredient } from "../../Types/BurgerConstructorTypes/StoreTypes/IngredientTypes";
import { requestToServ } from "../api/api";
import { AppDispatch, AppThunk } from "../types";

const REQUEST_INGREDIENTS: "REQUEST_INGREDIENTS" = "REQUEST_INGREDIENTS";
const REQUEST_INGREDIENTS_FAILED: "REQUEST_INGREDIENTS_FAILED" =
  "REQUEST_INGREDIENTS_FAILED";
const REQUEST_INGREDIENTS_SUCCESS: "REQUEST_INGREDIENTS_SUCCESS" =
  "REQUEST_INGREDIENTS_SUCCESS";

const ADD_TO_CART: "ADD_TO_CART" = "ADD_TO_CART";
const ADD_BUN_TO_CART: "ADD_BUN_TO_CART" = "ADD_BUN_TO_CART";
const REMOVE_FROM_CART: "REMOVE_FROM_CART" = "REMOVE_FROM_CART";
const SORT_CART: "SORT_CART" = "SORT_CART";

const SET_MODAL_ING: "SET_MODAL_ING" = "SET_MODAL_ING";
const DEL_MODAL_ING: "DEL_MODAL_ING" = "DEL_MODAL_ING";

const SET_ORDER_DATA: "SET_ORDER_DATA" = "SET_ORDER_DATA";
const SET_ORDER_DATA_SUCCESS: "SET_ORDER_DATA_SUCCESS" =
  "SET_ORDER_DATA_SUCCESS";
const SET_ORDER_DATA_FAILED: "SET_ORDER_DATA_FAILED" = "SET_ORDER_DATA_FAILED";

interface IRequestIngredients {
  readonly type: typeof REQUEST_INGREDIENTS;
}

interface IRequestIngredientsFailed {
  readonly type: typeof REQUEST_INGREDIENTS_FAILED;
}

interface IRequestIngredientsSuccess {
  readonly type: typeof REQUEST_INGREDIENTS_SUCCESS;
  ingredients: IIngredient[];
}

interface IAddToCart {
  readonly type: typeof ADD_TO_CART;
}

interface IAddBunToCart {
  readonly type: typeof ADD_BUN_TO_CART;
}

interface IRemoveFromCart {
  readonly type: typeof REMOVE_FROM_CART;
}

interface ISortCart {
  readonly type: typeof SORT_CART;
}

interface ISetModal {
  readonly type: typeof SET_MODAL_ING;
}

interface IDelModal {
  readonly type: typeof DEL_MODAL_ING;
}

interface ISetOrder {
  readonly type: typeof SET_ORDER_DATA;
}

interface ISetOrderSuccess {
  readonly type: typeof SET_ORDER_DATA_SUCCESS;
}

interface ISetOrderFailed {
  readonly type: typeof SET_ORDER_DATA_FAILED;
}

export type TIngredientsActions =
  | IRequestIngredients
  | IRequestIngredientsFailed
  | IRequestIngredientsSuccess
  | IAddToCart
  | IAddBunToCart
  | IRemoveFromCart
  | ISortCart
  | ISetModal
  | IDelModal
  | ISetOrder
  | ISetOrderSuccess
  | ISetOrderFailed;

export const getIngredients = (): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REQUEST_INGREDIENTS,
    });
    try {
      requestToServ("ingredients").then((res) => {
        if (res) {
          dispatch({
            type: REQUEST_INGREDIENTS_SUCCESS,
            ingredients: res.data,
          });
        } else {
          dispatch({
            type: REQUEST_INGREDIENTS_FAILED,
          });
        }
      });
    } catch (err) {
      if (err instanceof Error)
        throw new Error(
          `Ошибка в получении сведений об ингредиентах ${err.message}`
        );
    }
  };
};

export const sendOrderData: AppThunk = (data) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SET_ORDER_DATA,
    });
    try {
      requestToServ("orders", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      }).then((res) => {
        if (res) {
          dispatch({
            type: SET_ORDER_DATA_SUCCESS,
            orderData: res,
          });
        } else {
          dispatch({
            type: SET_ORDER_DATA_FAILED,
          });
        }
      });
    } catch (err) {
      if (err instanceof Error)
        throw new Error(`Ошибка в получении сведений о заказе ${err.message}`);
    }
  };
};

export {
  REQUEST_INGREDIENTS,
  REQUEST_INGREDIENTS_FAILED,
  REQUEST_INGREDIENTS_SUCCESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_BUN_TO_CART,
  SET_MODAL_ING,
  DEL_MODAL_ING,
  SET_ORDER_DATA,
  SET_ORDER_DATA_SUCCESS,
  SET_ORDER_DATA_FAILED,
  SORT_CART,
};
