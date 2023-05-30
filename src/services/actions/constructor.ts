import { IIngredient } from "../../Types/BurgerConstructorTypes/StoreTypes/IngredientTypes";

export const ADD_TO_CART: "ADD_TO_CART" = "ADD_TO_CART";
export const ADD_BUN_TO_CART: "ADD_BUN_TO_CART" = "ADD_BUN_TO_CART";
export const SORT_CART: "SORT_CART" = "SORT_CART";
export const DELETE_FROM_CART: "DELETE_FROM_CART" = "DELETE_FROM_CART";

interface IAddtoCart {
  readonly type: typeof ADD_TO_CART;
  readonly payload: IIngredient;
}

interface IAddBuntoCart {
  readonly type: typeof ADD_BUN_TO_CART;
  readonly payload: IIngredient;
}

interface ISortCart {
  readonly type: typeof SORT_CART;
  dragIndex: number;
  hoverIndex: number;
}

interface IDeleteFromCart {
  readonly type: typeof DELETE_FROM_CART;
  readonly ing: number;
}

export type TConstructorActions =
  | IAddtoCart
  | IAddBuntoCart
  | ISortCart
  | IDeleteFromCart;
