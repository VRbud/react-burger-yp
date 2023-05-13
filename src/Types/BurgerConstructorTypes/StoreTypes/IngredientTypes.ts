export interface IIngredient {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
}

export type IIngredientData = {
  ingredientData: IIngredient;
};

export interface IIngredientType {
  bunsArray: IIngredient[];
  saucesArray: IIngredient[];
  FillArray: IIngredient[];
}

export interface IIngredientRequest {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
}
