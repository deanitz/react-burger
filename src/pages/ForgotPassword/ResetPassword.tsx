import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout/PageLayout";
import { useForm } from "../../hooks/useForm";
import { useLoginProtection } from "../../hooks/useLoginProtection";
import {
  renew as renewPassword,
  resetState,
} from "../../services/slices/resetPasswordSlice";
import { FormSubmitEventFunc } from "../../types/utilityTypes";
import { ROUTE_FORGOT_PASSWORD, ROUTE_LOGIN } from "../../utils/routes";
import { useAppDispatch, useAppSelector } from "../../utils/store";

const ResetPassword = () => {
  const { navigateIfLoggedIn } = useLoginProtection();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isCompleted, setIsCompleted] = useState(false);

  const {
    isRenewPasswordSuccess,
    isRenewPasswordLoading,
    isRenewPasswordError,
    isResetPasswordSuccess,
  } = useAppSelector(({ resetPassword }) => ({
    isRenewPasswordSuccess:
      resetPassword.renew.success &&
      !resetPassword.renew.loading &&
      !resetPassword.renew.error,
    isRenewPasswordError: resetPassword.renew.error,
    isRenewPasswordLoading: resetPassword.renew.loading,
    isResetPasswordSuccess: resetPassword.reset.success,
  }));

  const { values, handleChange } = useForm({
    newPassword: "",
    code: "",
  });

  const handleRenewPassword = useCallback(
    (e: FormSubmitEventFunc) => {
      e.preventDefault();
      dispatch(
        renewPassword({
          password: values.newPassword,
          token: values.code,
        })
      );
    },
    [dispatch, values.code, values.newPassword]
  );

  useEffect(() => {
    if (isCompleted) {
      dispatch(resetState());
      navigate(ROUTE_LOGIN, { replace: false });
      return;
    }
    if (isRenewPasswordSuccess && isResetPasswordSuccess && !isCompleted) {
      setIsCompleted(true);
      return;
    }
    if (!isResetPasswordSuccess && !isCompleted) {
      navigate(ROUTE_FORGOT_PASSWORD, { replace: false });
      return;
    }
  }, [
    isCompleted,
    isRenewPasswordSuccess,
    isResetPasswordSuccess,
    dispatch,
    navigate,
  ]);

  return (
    navigateIfLoggedIn() || (
      <PageLayout>
        <form className="page-form" onSubmit={handleRenewPassword}>
          <h1 className="text text_type_main-medium mt-10 mb-5">
            Восстановление пароля
          </h1>
          <div className="mt-6">
            <PasswordInput
              onChange={handleChange}
              value={values.newPassword}
              placeholder={"Введите новый пароль"}
              name={"newPassword"}
            />
          </div>
          <div className="mt-6">
            <Input
              type={"text"}
              placeholder={"Введите код из письма"}
              onChange={handleChange}
              value={values.code}
              name={"code"}
              errorText={"Ошибка ввода кода"}
            />
          </div>
          <div className="mt-6">
            <Button
              type="primary"
              size="medium"
              htmlType="submit"
              disabled={
                isRenewPasswordLoading ||
                isRenewPasswordSuccess ||
                !values?.newPassword?.length ||
                !values?.code?.length
              }
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
          {isRenewPasswordError && (
            <span className="error-message mt-10 text text_type_main-default">
              Ошибка при обновлении пароля. Попробуйте еще раз.
            </span>
          )}
        </form>
      </PageLayout>
    )
  );
};

export default ResetPassword;
