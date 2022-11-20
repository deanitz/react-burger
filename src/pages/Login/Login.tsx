import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout/PageLayout";
import { useForm } from "../../hooks/useForm";
import { useLoginProtection } from "../../hooks/useLoginProtection";
import { login, resetLogin } from "../../services/slices/authSlice";
import { FormSubmitEventFunc } from "../../types/utilityTypes";
import {
  ROUTE_FORGOT_PASSWORD,
  ROUTE_REGISTER,
  ROUTE_ROOT,
} from "../../utils/routes";
import { useAppDispatch, useAppSelector } from "../../utils/store";

const Login = () => {
  const { navigateIfLoggedIn } = useLoginProtection();
  const { state: locationState } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoginSuccess, isLoginLoading, isLoginError } = useAppSelector(
    ({ auth }) => ({
      isLoginSuccess: auth.login.success,
      isLoginLoading: auth.login.loading,
      isLoginError: auth.login.error,
    })
  );

  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleLogin = useCallback(
    (e: FormSubmitEventFunc) => {
      e.preventDefault();
      dispatch(
        login({
          email: values.email,
          password: values.password,
        })
      );
    },
    [dispatch, values.email, values.password]
  );

  useEffect(() => {
    if (isLoginSuccess) {
      dispatch(resetLogin());
      navigate(locationState?.returnPath || ROUTE_ROOT, { replace: false });
    }
  }, [isLoginSuccess, isLoginError, locationState, dispatch, navigate]);

  return (
    navigateIfLoggedIn() || (
      <PageLayout>
        <form className="page-form" onSubmit={handleLogin}>
          <h1 className="text text_type_main-medium mt-10 mb-5">Вход</h1>
          <div className="mt-6">
            <EmailInput
              onChange={handleChange}
              value={values.email}
              name={"email"}
            />
          </div>
          <div className="mt-6">
            <PasswordInput
              onChange={handleChange}
              value={values.password}
              name={"password"}
            />
          </div>
          <div className="mt-6">
            <Button
              type="primary"
              size="medium"
              htmlType="submit"
              disabled={
                isLoginLoading ||
                !values?.email?.length ||
                !values?.password.length
              }
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
    )
  );
};

export default Login;
