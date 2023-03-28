import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import burgerData from "../../utils/data.json";

function App() {
  return (
    <>
      <AppHeader />
      <main>
        <section>
          <div className="container burger_container">
            <BurgerIngredients data={burgerData} />
            <BurgerConstructor data={burgerData} />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
