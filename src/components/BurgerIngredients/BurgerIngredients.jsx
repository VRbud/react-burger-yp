import React from "react";
import Ingredient from "./Ingredient/Ingredient";
import styles from "./BurgerIngredients.module.css";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredients({ data }) {
  const [current, setCurrent] = React.useState("one");

  function getBuns() {
    let bunsArray = [];
    data.map((bun) => {
      if (bun.type === "bun") bunsArray.push(bun);
    });
    return bunsArray;
  }

  function getSauces() {
    let saucesArray = [];
    data.map((sauce) => {
      if (sauce.type === "sauce") saucesArray.push(sauce);
    });
    return saucesArray;
  }
  getSauces();

  function getFillings() {
    let FillArray = [];
    data.map((filling) => {
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

      <div className={`${styles.ingredient_wrapper}`}>
        <div className={styles.ingredient_container}>
          <h3 className="text text_type_main-medium">Булки</h3>
          <div className={`${styles.ingredint_type} pt-6 pb-10 pl-4 pr-4`}>
            <ul className={`list_reset ${styles.ingredint_list}`}>
              {getBuns().map((bun) => (
                <Ingredient key={bun._id} ingredientData={bun} />
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.ingredient_container}>
          <h3 className="text text_type_main-medium">Соусы</h3>
          <div className={`${styles.ingredint_type} pt-6 pb-10 pl-4 pr-4`}>
            <ul className={`list_reset ${styles.ingredint_list}`}>
              {getSauces().map((sauce) => (
                <Ingredient key={sauce._id} ingredientData={sauce} />
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.ingredient_container}>
          <h3 className="text text_type_main-medium">Начинки</h3>
          <div className={`${styles.ingredint_type} pt-6 pb-10 pl-4 pr-4`}>
            <ul className={`list_reset ${styles.ingredint_list}`}>
              {getFillings().map((filling) => (
                <Ingredient key={filling._id} ingredientData={filling} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BurgerIngredients;
