import { ingredientsReducer } from "../services/reducers/ingredients";

test("should return initial state", () => {
  expect(ingredientsReducer(undefined, { type: undefined })).toEqual({
    ingredients: null,
    ingredientsRequest: false,
    ingredientsFailed: false,
  });
});

test("should request ingredients", () => {
  expect(
    ingredientsReducer(undefined, { type: "REQUEST_INGREDIENTS" })
  ).toEqual({
    ingredients: null,
    ingredientsRequest: true,
    ingredientsFailed: false,
  });
});

test("should add ingredients", () => {
  expect(
    ingredientsReducer(undefined, {
      type: "REQUEST_INGREDIENTS_SUCCESS",
      ingredients: [{}],
    })
  ).toEqual({
    ingredients: [{}],
    ingredientsRequest: false,
    ingredientsFailed: false,
  });
});
