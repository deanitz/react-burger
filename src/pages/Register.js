import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout/PageLayout";

const Register = () => {
  const [state, setState] = useState({
    name: "",
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
        <h1 className="text text text_type_main-medium mt-10 mb-5">
          Регистрация
        </h1>
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
            Зарегистрироваться
          </Button>
        </div>
        <span className="mt-20 text text_type_main-default">
          Уже зарегистрированы?{" "}
          <Link to="/login" className="page-form_link">
            Войти
          </Link>
        </span>
      </form>
    </PageLayout>
  );
};

export default Register;
