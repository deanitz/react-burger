import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout/PageLayout";
import {
  resetPassword,
  resetState,
} from "../services/slices/resetPasswordSlice";
import { ROUTE_LOGIN, ROUTE_RESET_PASSWORD } from "../utils/routes";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const {
    isResetPasswordSuccess,
    isResetPasswordLoading,
    isResetPasswordError,
  } = useSelector(({ resetPassword }) => ({
    isResetPasswordSuccess:
      resetPassword.resetPasswordSuccess &&
      !resetPassword.resetPasswordLoading &&
      !resetPassword.resetPasswordError,
    isResetPasswordError: resetPassword.resetPasswordError,
    isResetPasswordLoading: resetPassword.resetPasswordLoading,
  }));

  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
  });
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleResetPassword = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(resetPassword(state.email));
    },
    [dispatch, state.email]
  );

  useEffect(() => {
    if (isResetPasswordSuccess) {
      console.log("before dispatch(resetState)");
      dispatch(resetState());
      console.log("after dispatch(resetState)");
      navigate(ROUTE_RESET_PASSWORD, { replace: false });
      return;
    }
    if (isResetPasswordError) {
      dispatch(resetState());
      alert("Что-то пошло не так. Попробуйте еще раз.");
    }
  }, [isResetPasswordSuccess, isResetPasswordError, dispatch, navigate]);

  return (
    <PageLayout>
      <form className="page-form">
        <h1 className="text text text_type_main-medium mt-10 mb-5">
          Восстановление пароля
        </h1>
        <div className="mt-6">
          <EmailInput onChange={onChange} value={state.email} name={"email"} />
        </div>
        <div className="mt-6">
          <Button
            type="primary"
            size="medium"
            onClick={handleResetPassword}
            disabled={isResetPasswordLoading || isResetPasswordSuccess}
            htmlType="button"
          >
            Восстановить
          </Button>
        </div>
        <span className="mt-20 text text_type_main-default">
          Вспомнили пароль?{" "}
          <Link to={ROUTE_LOGIN} className="page-form_link">
            Войти
          </Link>
        </span>
      </form>
    </PageLayout>
  );
};

export default ForgotPassword;
