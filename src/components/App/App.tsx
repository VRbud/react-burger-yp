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

enum AppRoutes {
  main = "/",
  login = "/login",
  register = "/register",
  forgotpw = "/forgot-password",
  resetpw = "/reset-password",
  profile = "/profile",
  profileOrders = "/profile/orders",
  profileOrdersId = "/profile/orders/:id",
  feed = "/feed",
  feedId = "/feed/:id",
  ingredientsId = "/ingredients/:id",
  default = "*",
}

function App() {
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  return (
    <>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>
        <Route path={AppRoutes.main} element={<CreateBurgerPage />} />
        <Route
          path={AppRoutes.login}
          element={<OnlyUnAuthRoute path="/profile" element={<LoginPage />} />}
        />
        <Route
          path={AppRoutes.register}
          element={<OnlyUnAuthRoute path="/" element={<RegisterPage />} />}
        />
        <Route
          path={AppRoutes.forgotpw}
          element={
            <OnlyUnAuthRoute path="/profile" element={<FortgotPWPage />} />
          }
        />
        <Route
          path={AppRoutes.resetpw}
          element={
            <OnlyUnAuthRoute path="/profile" element={<ResetPWPage />} />
          }
        />
        <Route
          path={AppRoutes.profile}
          element={<ProtectedRoute element={<ProfilePage />} />}
        />
        <Route
          path={AppRoutes.profileOrders}
          element={<ProtectedRoute element={<ProfileHistoryPage />} />}
        />
        <Route
          path={AppRoutes.profileOrdersId}
          element={<ProtectedRoute element={<FeedOrder />} />}
        />
        <Route path={AppRoutes.feed} element={<FeedPage />} />
        <Route path={AppRoutes.feedId} element={<FeedOrder />} />
        <Route path={AppRoutes.ingredientsId} element={<IngredientPage />} />
        <Route path={AppRoutes.default} element={<ErrorPage />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path={AppRoutes.ingredientsId}
            element={
              <Modal>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={AppRoutes.profileOrdersId}
            element={
              <ProtectedRoute
                element={
                  <Modal>
                    <FeedOrder />
                  </Modal>
                }
              />
            }
          />
          <Route
            path={AppRoutes.feedId}
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
