import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
  return (
    <>
      <AppHeader />
      <main>
        <section className="pb-10 burger_container">
          <BurgerIngredients />
          <BurgerConstructor />
        </section>
      </main>
    </>
  );
}

export default App;
