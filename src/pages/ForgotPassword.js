import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout/PageLayout";

const ForgotPassword = () => {
  const [state, setState] = useState({
    email: "",
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
          <EmailInput onChange={onChange} value={state.email} name={"email"} />
        </div>
        <div className="mt-6">
          <Button type="primary" size="medium">
            Восстановить
          </Button>
        </div>
        <span className="mt-20 text text_type_main-default">
          Вспомнили пароль?{" "}
          <Link to="/login" className="page-form_link">
            Войти
          </Link>
        </span>
      </form>
    </PageLayout>
  );
};

export default ForgotPassword;
