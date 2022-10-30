import { useState, useEffect, useCallback } from "react";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfo,
  resetGetUserInfo,
  updateUserInfo,
} from "../../services/slices/profileSlice";

const AccountInfo = () => {
  const dispatch = useDispatch();

  const { isGetUserInfoSuccess, isGetUserInfoError, userInfo } = useSelector(
    ({ profile }) => ({
      isGetUserInfoSuccess:
        profile.getUserInfo.info &&
        !profile.getUserInfo.loading &&
        !profile.getUserInfo.error,
      userInfo: profile.getUserInfo.info,
      isGetUserInfoError: profile.getUserInfo.error,
    })
  );

  useEffect(() => {
    if (isGetUserInfoSuccess) {
      setState({
        name: userInfo.name,
        email: userInfo.email,
        password: "",
      });
      return;
    }
    if (isGetUserInfoError) {
      dispatch(resetGetUserInfo());
      alert("Ошибка загрузки данных пользователя.");
    }
  }, [dispatch, isGetUserInfoSuccess, isGetUserInfoError, userInfo]);

  useEffect(() => {
    dispatch(resetGetUserInfo());
    dispatch(getUserInfo());
  }, [dispatch]);

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

  const handleSave = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(
        updateUserInfo({
          ...state,
        })
      );
    },
    [dispatch, state]
  );

  const handleCancel = useCallback((e) => {
    e.preventDefault();

    dispatch(resetGetUserInfo());
    dispatch(getUserInfo());
  }, []);

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
      <div className="mt-6">
        <Button
          type="primary"
          size="medium"
          htmlType="button"
          onClick={handleSave}
          disabled={false}
        >
          Сохранить
        </Button>
        <Button
          type="secondary"
          size="medium"
          htmlType="button"
          onClick={handleCancel}
          disabled={false}
        >
          Отменить
        </Button>
      </div>
    </form>
  );
};

export default AccountInfo;
