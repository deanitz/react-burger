import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout/PageLayout";
import { ROUTE_LOGIN } from "../utils/routes";

const ResetPassword = () => {
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

  return (
    <PageLayout>
      <form className="page-form">
        <h1 className="text text text_type_main-medium mt-10 mb-5">
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
          <Button type="primary" size="medium" htmlType="button">
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
