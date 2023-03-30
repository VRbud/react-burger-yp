import React, { useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import axios from "axios";

const PUBLIC_URL = "https://norma.nomoreparties.space/api/";

function App() {
  const [ingredientsData, setingredientsData] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`${PUBLIC_URL}ingredients`);
        setingredientsData(result.data.data);
      } catch (e) {
        setIsError(true);
      }
      setIsError(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <AppHeader />
      <main>
        <section>
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
