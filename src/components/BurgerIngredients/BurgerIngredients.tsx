import { useState, useRef, useMemo, useEffect } from "react";
import Ingredient from "./Ingredient/Ingredient";
import IngredientCat from "./IngredientCat/IngredientCat";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { getIngredients } from "../../services/actions/ingredients";
import Spinner from "../../ui/Spinner";
import { InView } from "react-intersection-observer";
import { IIngredient } from "../../Types/BurgerConstructorTypes/StoreTypes/IngredientTypes";
import { useAppDispatch, useAppSelector } from "../../services/hooks";

function BurgerIngredients() {
  const { ingredients, ingredientsRequest } = useAppSelector(
    (state) => state.ingredients
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const [current, setCurrent] = useState("buns");
  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const fillingsRef = useRef<HTMLDivElement>(null);

  const { bunsArray, saucesArray, FillArray } = useMemo(() => {
    let bunsArray: IIngredient[] = [];
    let saucesArray: IIngredient[] = [];
    let FillArray: IIngredient[] = [];
    if (ingredients !== null) {
      // eslint-disable-next-line
      ingredients.map((ingredient: IIngredient) => {
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
    return { bunsArray, saucesArray, FillArray };
  }, [ingredients]);

  const clickHandler = (elem: string) => {
    if (elem === "buns") {
      bunsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (elem === "sauces") {
      saucesRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (elem === "fillings") {
      fillingsRef.current?.scrollIntoView({
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
        <Tab value="buns" active={current === "buns"} onClick={clickHandler}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === "sauces"} onClick={clickHandler}>
          Соусы
        </Tab>
        <Tab
          value="fillings"
          active={current === "fillings"}
          onClick={clickHandler}
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
            {bunsArray.map((bun: IIngredient) => (
              <Ingredient key={bun._id} ingredientData={bun} />
            ))}
          </IngredientCat>
        </InView>
        <InView
          threshold={0.5}
          onChange={(inView) => inView && setCurrent("sauces")}
        >
          <IngredientCat thisRef={saucesRef} title="Соусы">
            {saucesArray.map((sauce: IIngredient) => (
              <Ingredient key={sauce._id} ingredientData={sauce} />
            ))}
          </IngredientCat>
        </InView>
        <InView
          threshold={0.5}
          onChange={(inView) => inView && setCurrent("fillings")}
        >
          <IngredientCat thisRef={fillingsRef} title="Начинки">
            {FillArray.map((filling: IIngredient) => (
              <Ingredient key={filling._id} ingredientData={filling} />
            ))}
          </IngredientCat>
        </InView>
      </div>
    </div>
  );
}

export default BurgerIngredients;
