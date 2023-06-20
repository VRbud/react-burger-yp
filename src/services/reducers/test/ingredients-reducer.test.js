import * as action from '../../actions/ingredients'
import {ingredientsReducer} from "../ingredients";


test('should return initial state', () => {
    expect(ingredientsReducer(undefined, {type: undefined})).toEqual({
        ingredients: null,
        ingredientsRequest: false,
        ingredientsFailed: false,
    })
})

test('should add ingredients', () => {
    expect(ingredientsReducer(undefined, {type: "REQUEST_INGREDIENTS"})).toEqual({
        ingredients: null,
        ingredientsRequest: true,
        ingredientsFailed: false,
    })
})
