import React from "react";
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import burgerData from "./utils/data.json";

function getData() {
  const data = JSON.stringify(burgerData);
  const res = JSON.parse(data);
  return res;
}

function App() {
  return (
    <>
      <AppHeader />
      <main>
        <section>
          <div className="container burger_container">
            <BurgerIngredients data={getData()} />
            <BurgerConstructor data={getData()} />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
