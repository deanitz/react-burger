import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import PageLayout from "../components/PageLayout/PageLayout";

import styles from "./Profile.module.css";

const Profile = () => {
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
      <section className={styles.profile}>
        <div className={`ml-5 mt-6 mr-15 ${styles.leftColumn}`}>
          <nav>
            <ul className={styles.menuContainer}>
              <li className="pt-2 pb-2">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `text text_type_main-medium ${styles.navLink} ${
                      isActive ? styles.navLinkActive : ""
                    }`
                  }
                >
                  Профиль
                </NavLink>
              </li>
              <li className="pt-2 pb-2">
                <NavLink
                  to="/profile/orders"
                  className={`text text_type_main-medium ${styles.navLink}`}
                >
                  История заказов
                </NavLink>
              </li>
              <li className="pt-2 pb-2">
                <NavLink
                  className={`text text_type_main-medium ${styles.navLink}`}
                >
                  Выход
                </NavLink>
              </li>
            </ul>
          </nav>
          <span
            className={`mt-20 text text_type_main-default ${styles.infoText}`}
          >
            В этом разделе вы можете изменить свои персональные данные
          </span>
        </div>
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
      </section>
    </PageLayout>
  );
};

export default Profile;
