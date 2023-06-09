import IngredientDetails from "../components/BurgerIngredients/IngredientDetails/IngredientDetails";
import { useEffect } from "react";
import { getIngredients } from "../services/actions/ingredients";
import { useAppDispatch } from "../services/hooks";

function IngredientPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
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
