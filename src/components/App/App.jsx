import { Routes, Route, useLocation } from "react-router-dom";
import CreateBurgerPage from "../../pages/CreateBurgerPage";
import ProfilePage from "../../pages/ProfilePage";
import FortgotPWPage from "../../pages/FortgotPWPage";
import IngredientPage from "../../pages/IngredientPage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ResetPWPage from "../../pages/ResetPWPage";
import AppHeader from "../AppHeader/AppHeader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ErrorPage from "../../pages/ErrorPage";
import Modal from "../Modal/Modal";
import OnlyUnAuthRoute from "../OnlyUnAuthRoute/OnlyUnAuthRoute";

function App() {
  let location = useLocation();
  let state = location.state || {};
  state.backgroundLocation = location.state;
  return (
    <>
      <AppHeader />
      <Routes location={state.backgroundLocation || location}>
        <Route path="/" element={<CreateBurgerPage />} />
        <Route
          path="/login"
          element={<OnlyUnAuthRoute element={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<OnlyUnAuthRoute element={<RegisterPage />} />}
        />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuthRoute element={<FortgotPWPage />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuthRoute element={<ResetPWPage />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<ProfilePage />} />}
        />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {state.backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<Modal />} />
        </Routes>
      )}
    </>
  );
}

export default App;
