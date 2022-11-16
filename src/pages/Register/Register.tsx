import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout/PageLayout";
import { useLoginProtection } from "../../hooks/useLoginProtection";
import { register } from "../../services/slices/authSlice";
import { RegistrationRequest } from "../../types/dataTypes";
import {
  FormSubmitEventFunc,
  InputChangeEventFunc,
} from "../../types/utilityTypes";
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

  const [state, setState] = useState<RegistrationRequest>({
    name: "",
    email: "",
    password: "",
  });
  const onChange = (e: InputChangeEventFunc) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleRegistration = useCallback(
    (e: FormSubmitEventFunc) => {
      e.preventDefault();
      dispatch(
        register({
          ...state,
        })
      );
    },
    [dispatch, state]
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
              onChange={onChange}
              value={state.name}
              name={"name"}
              errorText={"Ошибка ввода имени"}
            />
          </div>
          <div className="mt-6">
            <EmailInput
              onChange={onChange}
              value={state.email}
              name={"email"}
            />
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
              htmlType="submit"
              disabled={
                isRegistrationLoading ||
                !state?.name?.length ||
                !state?.email?.length ||
                !state?.password.length
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
