import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout/PageLayout";
import { useLoginProtection } from "../../hooks/useLoginProtection";
import { reset as resetPassword } from "../../services/slices/resetPasswordSlice";
import {
  InputChangeEventFunc,
  FormSubmitEventFunc,
} from "../../utils/dataShape";
import { ROUTE_LOGIN, ROUTE_RESET_PASSWORD } from "../../utils/routes";
import { useAppDispatch, useAppSelector } from "../../utils/store";

const ForgotPassword = () => {
  const { navigateIfLoggedIn } = useLoginProtection();
  const dispatch = useAppDispatch();
  const {
    isResetPasswordSuccess,
    isResetPasswordLoading,
    isResetPasswordError,
  } = useAppSelector(({ resetPassword }) => ({
    isResetPasswordSuccess:
      resetPassword.reset.success &&
      !resetPassword.reset.loading &&
      !resetPassword.reset.error,
    isResetPasswordError: resetPassword.reset.error,
    isResetPasswordLoading: resetPassword.reset.loading,
  }));

  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
  });
  const onChange = (e: InputChangeEventFunc) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleResetPassword = useCallback<(e: FormSubmitEventFunc) => void>(
    (e) => {
      e.preventDefault();
      dispatch(resetPassword(state.email));
    },
    [dispatch, state.email]
  );

  useEffect(() => {
    if (isResetPasswordSuccess) {
      navigate(ROUTE_RESET_PASSWORD, { replace: false });
    }
  }, [isResetPasswordSuccess, navigate]);

  return (
    navigateIfLoggedIn() || (
      <PageLayout>
        <form className="page-form" onSubmit={handleResetPassword}>
          <h1 className="text text_type_main-medium mt-10 mb-5">
            Восстановление пароля
          </h1>
          <div className="mt-6">
            <EmailInput
              onChange={onChange}
              value={state.email}
              name={"email"}
            />
          </div>
          <div className="mt-6">
            <Button
              type="primary"
              size="medium"
              disabled={
                isResetPasswordLoading ||
                isResetPasswordSuccess ||
                !state?.email?.length
              }
              htmlType="submit"
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
          {isResetPasswordError && (
            <span className="error-message mt-10 text text_type_main-default">
              Ошибка при сбросе пароля. Попробуйте еще раз.
            </span>
          )}
        </form>
      </PageLayout>
    )
  );
};

export default ForgotPassword;
