import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppMain from "../AppMain/AppMain";
import { fetchIngredients } from "../../services/slices/ingredientsSlice";
import { Routes, Route, BrowserRouter } from "react-router-dom";
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

const App = () => {
  const dispatch = useDispatch();

  const { ingredientsData, ingredientsDataError } = useSelector(
    ({ ingredients }) => ({
      ingredientsData: ingredients.ingredientsData,
      ingredientsDataError: ingredients.ingredientsDataError,
    })
  );

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (ingredientsDataError) {
      alert("Что-то пошло не так. Попробуйте еще раз.");
    }
  }, [ingredientsDataError]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<AppMain />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="profile" element={<Profile />} />
          <Route path="ingredients/:id" element={<IngredientInfo />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
