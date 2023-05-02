import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateBurgerPage() {
  const { loginData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginData) {
      navigate("/");
    }
    if (!loginData) {
      navigate("/login");
    }
  }, [loginData, navigate]);

  return (
    <>
      <main>
        <section className="pb-10 burger_container">
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </section>
      </main>
    </>
  );
}

export default CreateBurgerPage;
