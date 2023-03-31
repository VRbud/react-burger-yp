import React, { useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import axios from "axios";

const PUBLIC_URL = "https://norma.nomoreparties.space/api/";

function App() {
  const [ingredientsData, setIngredientsData] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`${PUBLIC_URL}ingredients`);
        if (result.status >= 200 && result.status < 300) {
          setIngredientsData(result.data.data);
        } else {
          setIsError(true);
          throw new Error("Что-то пошло не так");
        }
      } catch (e) {
        setIsError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <AppHeader />
      <main>
        <section className="pb-10">
          <div
            className={`container burger_container ${isError ? "error" : ""}`}
          >
            {isError && <div className="text text_type_main-large">ошибка</div>}
            {ingredientsData ? (
              <>
                <BurgerIngredients ingredientsData={ingredientsData} />
                <BurgerConstructor ingredientsData={ingredientsData} />
              </>
            ) : (
              ""
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
