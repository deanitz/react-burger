import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout/PageLayout";
import {
  renewPassword,
  resetState,
} from "../services/slices/resetPasswordSlice";
import { ROUTE_LOGIN } from "../utils/routes";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const {
    isRenewPasswordSuccess,
    isRenewPasswordLoading,
    isRenewPasswordError,
  } = useSelector(({ resetPassword }) => ({
    isRenewPasswordSuccess:
      resetPassword.renewPasswordSuccess &&
      !resetPassword.renewPasswordLoading &&
      !resetPassword.renewPasswordError,
    isRenewPasswordError: resetPassword.renewPasswordError,
    isRenewPasswordLoading: resetPassword.renewPasswordLoading,
  }));

  const navigate = useNavigate();

  const [state, setState] = useState({
    newPassword: "",
    code: "",
  });
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleRenewPassword = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(renewPassword(state.email));
    },
    [dispatch, state.email]
  );

  useEffect(() => {
    if (isRenewPasswordSuccess) {
      dispatch(resetState());
      navigate(ROUTE_LOGIN, { replace: false });
      return;
    }
    if (isRenewPasswordError) {
      dispatch(resetState());
      alert("Что-то пошло не так. Попробуйте еще раз.");
    }
  }, [isRenewPasswordSuccess, isRenewPasswordError, dispatch, navigate]);

  return (
    <PageLayout>
      <form className="page-form">
        <h1 className="text text_type_main-medium mt-10 mb-5">
          Восстановление пароля
        </h1>
        <div className="mt-6">
          <PasswordInput
            onChange={onChange}
            value={state.newPassword}
            placeholder={"Введите новый пароль"}
            name={"newPassword"}
          />
        </div>
        <div className="mt-6">
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={onChange}
            value={state.code}
            name={"code"}
            errorText={"Ошибка ввода кода"}
          />
        </div>
        <div className="mt-6">
          <Button
            type="primary"
            size="medium"
            htmlType="button"
            onClick={handleRenewPassword}
            disabled={isRenewPasswordLoading || isRenewPasswordSuccess}
          >
            Сохранить
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

export default ResetPassword;
