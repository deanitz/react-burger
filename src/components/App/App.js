import AppMain from "../AppMain/AppMain";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AppLayout from "../AppLayout/AppLayout";
import {
  NotFound,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  IngredientInfo,
} from "../../pages";
import OrdersHistory from "../../pages/profile/OrdersHistory";
import AccountInfo from "../../pages/profile/AccountInfo";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useIngredients } from "../../hooks/useIngredients";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

const App = () => {
  useIngredients();

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

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
