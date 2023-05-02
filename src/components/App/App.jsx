import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path="/" element={<CreateBurgerPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<FortgotPWPage />} />
        <Route path="/reset-password" element={<ResetPWPage />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<ProfilePage />} />}
        />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
