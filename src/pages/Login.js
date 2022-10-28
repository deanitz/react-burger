import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout/PageLayout";

const Login = () => {
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

  return (
    <PageLayout>
      <form className="page-form">
        <h1 className="text text text_type_main-medium mt-10 mb-5">Вход</h1>
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
          <Button type="primary" size="medium">
            Войти
          </Button>
        </div>
        <span className="mt-20 text text_type_main-default">
          Вы — новый пользователь?{" "}
          <Link to="/register" className="page-form_link">
            Зарегистрироваться
          </Link>
        </span>
        <span className="mt-4 text text_type_main-default">
          Забыли пароль?{" "}
          <Link to="/forgot-password" className="page-form_link">
            Восстановить пароль
          </Link>
        </span>
      </form>
    </PageLayout>
  );
};

export default Login;
