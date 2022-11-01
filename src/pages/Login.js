import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout/PageLayout";
import { login, resetLogin } from "../services/slices/authSlice";
import {
  ROUTE_FORGOT_PASSWORD,
  ROUTE_REGISTER,
  ROUTE_ROOT,
} from "../utils/routes";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoginSuccess, isLoginLoading, isLoginError } = useSelector(
    ({ auth }) => ({
      isLoginSuccess: auth.login.success,
      isLoginLoading: auth.login.loading,
      isLoginError: auth.login.error,
    })
  );

  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        login({
          email: state.email,
          password: state.password,
        })
      );
    },
    [dispatch, state.email, state.password]
  );

  useEffect(() => {
    if (isLoginSuccess) {
      dispatch(resetLogin());
      navigate(ROUTE_ROOT, { replace: false });
      return;
    }
  }, [isLoginSuccess, isLoginError, dispatch, navigate]);

  return (
    <PageLayout>
      <form className="page-form">
        <h1 className="text text_type_main-medium mt-10 mb-5">Вход</h1>
        <div className="mt-6">
          <EmailInput onChange={onChange} value={state.email} name={"email"} />
        </div>
        <div className="mt-6">
          <PasswordInput
            onChange={onChange}
            value={state.password}
            name={"password"}
          />
        </div>
        <div className="mt-6">
          <Button
            type="primary"
            size="medium"
            htmlType="button"
            onClick={handleLogin}
            disabled={isLoginLoading}
          >
            Войти
          </Button>
        </div>
        <span className="mt-20 text text_type_main-default">
          Вы — новый пользователь?{" "}
          <Link to={ROUTE_REGISTER} className="page-form_link">
            Зарегистрироваться
          </Link>
        </span>
        <span className="mt-4 text text_type_main-default">
          Забыли пароль?{" "}
          <Link to={ROUTE_FORGOT_PASSWORD} className="page-form_link">
            Восстановить пароль
          </Link>
        </span>
        {isLoginError && (
          <span className="error-message mt-10 text text_type_main-default">
            Неверный адрес электронной почты или пароль.
          </span>
        )}
      </form>
    </PageLayout>
  );
};

export default Login;
