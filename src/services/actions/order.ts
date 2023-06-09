import { IIngredient } from "../../Types/BurgerConstructorTypes/StoreTypes/IngredientTypes";
import { getCookie, requestToServ } from "../api/api";
import { AppDispatch, AppThunk } from "../types";

export const SET_ORDER_DATA: "SET_ORDER_DATA" = "SET_ORDER_DATA";
export const SET_ORDER_DATA_SUCCESS: "SET_ORDER_DATA_SUCCESS" =
  "SET_ORDER_DATA_SUCCESS";
export const SET_ORDER_DATA_FAILED: "SET_ORDER_DATA_FAILED" =
  "SET_ORDER_DATA_FAILED";
export const DELETE_ORDER_DATA: "DELETE_ORDER_DATA" = "DELETE_ORDER_DATA";

interface ISetOrderData {
  readonly type: typeof SET_ORDER_DATA;
}

interface ISetOrderDataSuccess {
  readonly type: typeof SET_ORDER_DATA_SUCCESS;
  readonly orderData: any;
}

interface ISetOrderDataFailed {
  readonly type: typeof SET_ORDER_DATA_FAILED;
}

interface IDeleteOrderData {
  readonly type: typeof DELETE_ORDER_DATA;
}

export type TOrderActions =
  | ISetOrderData
  | ISetOrderDataSuccess
  | ISetOrderDataFailed
  | IDeleteOrderData;

export const sendOrderData = (data: {
  ingredients: Array<IIngredient["_id"]>;
}): AppThunk => {
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
          Authorization: getCookie("token"),
        } as HeadersInit,
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
