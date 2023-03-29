import React, { useState } from "react";
import Ingredient from "./Ingredient/Ingredient";
import IngredientCat from "./IngredientCat/IngredientCat";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { burgerIngredientsTypes } from "../../Types/types";

BurgerIngredients.propTypes = burgerIngredientsTypes;

function BurgerIngredients({ ingredientsData }) {
  console.log(ingredientsData);
  const [current, setCurrent] = useState("one");

  function getBuns() {
    let bunsArray = [];
    ingredientsData.map((bun) => {
      if (bun.type === "bun") bunsArray.push(bun);
    });
    return bunsArray;
  }

  function getSauces() {
    let saucesArray = [];
    ingredientsData.map((sauce) => {
      if (sauce.type === "sauce") saucesArray.push(sauce);
    });
    return saucesArray;
  }

  function getFillings() {
    let FillArray = [];
    ingredientsData.map((filling) => {
      if (filling.type === "main") FillArray.push(filling);
    });
    return FillArray;
  }

  return (
    <div className={`pt-10 mb-5 ${styles.ingredients}`}>
      <h2 className="text text_type_main-large mb-5">Соберите Бургер</h2>
      <div className={`${styles.tabs} mb-10`}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={`${styles.ingredient_wrapper} custom-scroll`}>
        <IngredientCat title="Булки">
          {getBuns().map((bun) => (
            <Ingredient key={bun._id} ingredientData={bun} />
          ))}
        </IngredientCat>
        <IngredientCat title="Соусы">
          {getSauces().map((sauce) => (
            <Ingredient key={sauce._id} ingredientData={sauce} />
          ))}
        </IngredientCat>
        <IngredientCat title="Начинки">
          {getFillings().map((filling) => (
            <Ingredient key={filling._id} ingredientData={filling} />
          ))}
        </IngredientCat>
      </div>
    </div>
  );
}

export default BurgerIngredients;
