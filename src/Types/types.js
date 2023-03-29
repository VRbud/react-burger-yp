import PropTypes from 'prop-types';

const burgerIngredientTypes = PropTypes.shape({
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  fat: PropTypes.number,
  image: PropTypes.string,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  proteins: PropTypes.number,
  type: PropTypes.string,
  __v: PropTypes.number,
  _id: PropTypes.string,
})

const burgerConstructorTypes = PropTypes.arrayOf(burgerIngredientTypes)

const ingredientCatTypes = PropTypes.shape({
  title: PropTypes.string,
  children: PropTypes.element,
})

const ingredientDetailsTypes = PropTypes.shape(burgerIngredientTypes)

const burgerIngredientsTypes = PropTypes.shape(burgerIngredientTypes)

const modalTypes = PropTypes.shape({
  children: PropTypes.element,
  onClose: PropTypes.func
})



export { burgerIngredientTypes, burgerConstructorTypes, ingredientCatTypes, ingredientDetailsTypes, burgerIngredientsTypes, modalTypes }