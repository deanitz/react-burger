import { useState } from "react";
import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AccountInfo = () => {
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
    <form className="page-form">
      <div className="mt-6">
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={state.name}
          name={"name"}
          errorText={"Ошибка ввода имени"}
          icon="EditIcon"
        />
      </div>
      <div className="mt-6">
        <EmailInput
          onChange={onChange}
          value={state.email}
          name={"email"}
          icon="EditIcon"
        />
      </div>
      <div className="mt-6">
        <PasswordInput
          onChange={onChange}
          value={state.password}
          name={"password"}
        />
      </div>
    </form>
  );
};

export default AccountInfo;
