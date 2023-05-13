import { IIngredient } from "../StoreTypes/IngredientTypes";

export type TSortedConstructorElement = {
  ingredient: IIngredient;
  index: number;
  id: number;
  moveIngredient: (arg0: number, arg1: number) => void;
  handleDelete: () => void;
};
