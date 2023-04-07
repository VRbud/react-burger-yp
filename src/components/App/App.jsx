import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import IngredientsProvider from "../../services/ingredientsContext";

function App() {
  return (
    <>
      <AppHeader />
      <main>
        <section className="pb-10 burger_container">
          <IngredientsProvider>
            <BurgerIngredients />
            <BurgerConstructor />
          </IngredientsProvider>
        </section>
      </main>
    </>
  );
}

export default App;
