import { IIngredient } from "../../Types/BurgerConstructorTypes/StoreTypes/IngredientTypes";

export const SET_MODAL_ING: "SET_MODAL_ING" = "SET_MODAL_ING";
export const DEL_MODAL_ING: "DEL_MODAL_ING" = "DEL_MODAL_ING";

interface ISetModal {
  readonly type: typeof SET_MODAL_ING;
  readonly payload: IIngredient;
}

interface IDelModal {
  readonly type: typeof DEL_MODAL_ING;
}

export type TModalActions = ISetModal | IDelModal;
