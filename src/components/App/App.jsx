import React, { useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import axios from "axios";

const PUBLIC_URL = "https://norma.nomoreparties.space/api/";

function App() {
  const [ingredientsData, setingredientsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${PUBLIC_URL}ingredients`);
      setingredientsData(result.data.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <AppHeader />
      <main>
        <section>
          <div className="container burger_container">
            {ingredientsData.length && (
              <>
                <BurgerIngredients ingredientsData={ingredientsData} />
                <BurgerConstructor ingredientsData={ingredientsData} />
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
