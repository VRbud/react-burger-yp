import { useState, useRef, useMemo, useEffect } from "react";
import Ingredient from "./Ingredient/Ingredient";
import IngredientCat from "./IngredientCat/IngredientCat";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import Spinner from "../../ui/Spinner";

import { InView } from "react-intersection-observer";

function BurgerIngredients() {
  const { ingredients, ingredientsRequest } = useSelector(
    (state) => state.ingredients
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const [current, setCurrent] = useState("buns");
  const bunsRef = useRef("buns");
  const saucesRef = useRef("sauces");
  const fillingsRef = useRef("fillings");

  const {
    bunsArray = [],
    saucesArray = [],
    FillArray = [],
  } = useMemo(() => {
    if (ingredients === null) return {};
    return getIngredientType(ingredients);
  }, [ingredients]);

  function getIngredientType(array) {
    let bunsArray = [];
    let saucesArray = [];
    let FillArray = [];
    if (array !== null) {
      // eslint-disable-next-line
      array.map((ingredient) => {
        // сортирует массив по категориям
        if (ingredient.type === "bun") {
          bunsArray.push(ingredient);
        } else if (ingredient.type === "sauce") {
          saucesArray.push(ingredient);
        } else if (ingredient.type === "main") {
          FillArray.push(ingredient);
        }
      });
      return { bunsArray, saucesArray, FillArray };
    }
  }

  const clickHadler = (elem) => {
    if (elem === "buns") {
      bunsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (elem === "sauces") {
      saucesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (elem === "fillings") {
      fillingsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else return;
    setCurrent(elem);
  };

  return ingredientsRequest ? (
    <Spinner />
  ) : (
    <div className={`pt-10 mb-5 ${styles.ingredients}`}>
      <h2 className="text text_type_main-large mb-5">Соберите Бургер</h2>
      <div className={`${styles.tabs} mb-10`}>
        <Tab value="buns" active={current === "buns"} onClick={clickHadler}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === "sauces"} onClick={clickHadler}>
          Соусы
        </Tab>
        <Tab
          value="fillings"
          active={current === "fillings"}
          onClick={clickHadler}
        >
          Начинки
        </Tab>
      </div>

      <div className={`${styles.ingredient_wrapper} custom-scroll`}>
        <InView
          threshold={0.5}
          onChange={(inView) => inView && setCurrent("buns")}
        >
          <IngredientCat thisRef={bunsRef} title="Булки">
            {bunsArray.map((bun) => (
              <Ingredient key={bun._id} ingredientData={bun} />
            ))}
          </IngredientCat>
        </InView>
        <InView
          threshold={0.5}
          onChange={(inView) => inView && setCurrent("sauces")}
        >
          <IngredientCat thisRef={saucesRef} title="Соусы">
            {saucesArray.map((sauce) => (
              <Ingredient key={sauce._id} ingredientData={sauce} />
            ))}
          </IngredientCat>
        </InView>
        <InView
          threshold={0.5}
          onChange={(inView) => inView && setCurrent("fillings")}
        >
          <IngredientCat thisRef={fillingsRef} title="Начинки">
            {FillArray.map((filling) => (
              <Ingredient key={filling._id} ingredientData={filling} />
            ))}
          </IngredientCat>
        </InView>
      </div>
    </div>
  );
}

export default BurgerIngredients;
