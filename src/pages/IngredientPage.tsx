import { useDispatch } from "react-redux";
import IngredientDetails from "../components/BurgerIngredients/IngredientDetails/IngredientDetails";
import { useEffect } from "react";
import { getIngredients } from "../services/actions/ingredients";

function IngredientPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    // disable types for redux dispatch
    //@ts-ignore
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <main>
        <IngredientDetails />
      </main>
    </>
  );
}

export default IngredientPage;
