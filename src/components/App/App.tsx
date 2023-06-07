import { Routes, Route, useLocation } from "react-router-dom";
import CreateBurgerPage from "../../pages/CreateBurgerPage";
import ProfilePage from "../../pages/ProfilePage";
import FortgotPWPage from "../../pages/FortgotPWPage";
import IngredientPage from "../../pages/IngredientPage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ResetPWPage from "../../pages/ResetPWPage";
import FeedPage from "../../pages/FeedPage";
import AppHeader from "../AppHeader/AppHeader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ErrorPage from "../../pages/ErrorPage";
import Modal from "../Modal/Modal";
import OnlyUnAuthRoute from "../OnlyUnAuthRoute/OnlyUnAuthRoute";
import IngredientDetails from "../BurgerIngredients/IngredientDetails/IngredientDetails";
import FeedOrder from "../FeedDetails/FeedOrder/FeedOrder";
import ProfileHistoryPage from "../../pages/ProfileHistoryPage";

function App() {
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  return (
    <>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<CreateBurgerPage />} />
        <Route
          path="/login"
          element={<OnlyUnAuthRoute path="/profile" element={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<OnlyUnAuthRoute path="/" element={<RegisterPage />} />}
        />
        <Route
          path="/forgot-password"
          element={
            <OnlyUnAuthRoute path="/profile" element={<FortgotPWPage />} />
          }
        />
        <Route
          path="/reset-password"
          element={
            <OnlyUnAuthRoute path="/profile" element={<ResetPWPage />} />
          }
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<ProfilePage />} />}
        />
        <Route
          path="/profile/orders"
          element={<ProtectedRoute element={<ProfileHistoryPage />} />}
        />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:id" element={<FeedOrder />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <Modal>
                <FeedOrder />
              </Modal>
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Modal>
                <FeedOrder />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
