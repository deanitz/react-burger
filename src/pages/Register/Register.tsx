import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout/PageLayout";
import { useForm } from "../../hooks/useForm";
import { useLoginProtection } from "../../hooks/useLoginProtection";
import { register } from "../../services/slices/authSlice";
import { FormSubmitEventFunc } from "../../types/utilityTypes";
import { ROUTE_LOGIN, ROUTE_ROOT } from "../../utils/routes";
import { useAppDispatch, useAppSelector } from "../../utils/store";

const Register = () => {
  const { navigateIfLoggedIn } = useLoginProtection();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isRegistrationSuccess, isRegistrationLoading, isRegistrationError } =
    useAppSelector(({ auth }) => ({
      isRegistrationSuccess: auth.register.success,
      isRegistrationLoading: auth.register.loading,
      isRegistrationError: auth.register.error,
    }));

  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const handleRegistration = useCallback(
    (e: FormSubmitEventFunc) => {
      e.preventDefault();
      dispatch(
        register({
          ...values,
        })
      );
    },
    [dispatch, values]
  );

  useEffect(() => {
    if (isRegistrationSuccess) {
      navigate(ROUTE_ROOT, { replace: false });
      return;
    }
  }, [isRegistrationSuccess, isRegistrationError, dispatch, navigate]);

  return (
    navigateIfLoggedIn() || (
      <PageLayout>
        <form className="page-form" onSubmit={handleRegistration}>
          <h1 className="text text_type_main-medium mt-10 mb-5">Регистрация</h1>
          <div className="mt-6">
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={handleChange}
              value={values.name}
              name={"name"}
              errorText={"Ошибка ввода имени"}
            />
          </div>
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
                isRegistrationLoading ||
                !values?.name?.length ||
                !values?.email?.length ||
                !values?.password.length
              }
            >
              Зарегистрироваться
            </Button>
          </div>
          <span className="mt-20 text text_type_main-default">
            Уже зарегистрированы?{" "}
            <Link to={ROUTE_LOGIN} className="page-form_link">
              Войти
            </Link>
          </span>
          {isRegistrationError && (
            <span className="error-message mt-10 text text_type_main-default">
              Ошибка регистрации. Попробуйте еще раз.
            </span>
          )}
        </form>
      </PageLayout>
    )
  );
};

export default Register;
