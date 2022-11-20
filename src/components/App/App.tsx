import AppMain from "../AppMain/AppMain";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AppLayout from "../AppLayout/AppLayout";
import OrdersHistory from "../../pages/Profile/OrdersHistory/OrdersHistory";
import AccountInfo from "../../pages/Profile/AccountInfo/AccountInfo";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useIngredients } from "../../hooks/useIngredients";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ForgotPassword/ResetPassword";
import Profile from "../../pages/Profile/Profile";
import IngredientInfo from "../../pages/IngredientInfo/IngredientInfo";
import NotFound from "../../pages/NotFound/NotFound";

const App = () => {
  useIngredients();

  const location = useLocation();
  const navigate = useNavigate();
  const background: Location | undefined = location.state
    ?.background;

  const handleCloseModal = () => {
    navigate(-1);
  };

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<AppMain />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route index element={<AccountInfo />} />
            <Route path="orders" element={<OrdersHistory />} />
          </Route>
          <Route path="ingredients/:id" element={<IngredientInfo />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                header={
                  <h1 className="text text_type_main-large">
                    Детали ингредиента
                  </h1>
                }
                onClose={handleCloseModal}
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
