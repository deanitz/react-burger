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
  resetUpdateUserInfo,
  updateUserInfo,
} from "../../services/slices/profileSlice";

const defaultAccountInfoState = {
  name: "",
  email: "",
  password: "",
};

const AccountInfo = () => {
  const dispatch = useDispatch();

  const {
    isGetUserInfoSuccess,
    isGetUserInfoLoading,
    isGetUserInfoError,
    userInfo,
  } = useSelector(({ profile }) => ({
    isGetUserInfoSuccess:
      profile.getUserInfo.info &&
      !profile.getUserInfo.loading &&
      !profile.getUserInfo.error,
    userInfo: profile.getUserInfo.info,
    isGetUserInfoLoading: profile.getUserInfo.loading,
    isGetUserInfoError: profile.getUserInfo.error,
  }));

  useEffect(() => {
    if (isGetUserInfoSuccess) {
      setState({
        name: userInfo.name,
        email: userInfo.email,
        password: "",
      });
      return;
    }
  }, [dispatch, isGetUserInfoSuccess, userInfo]);

  useEffect(() => {
    setState(defaultAccountInfoState);
    dispatch(getUserInfo());

    return () => {
      dispatch(resetGetUserInfo());
      dispatch(resetUpdateUserInfo());
    };
  }, [dispatch]);

  const [state, setState] = useState(defaultAccountInfoState);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const { isSaveUserInfoSuccess, isSaveUserInfoLoading, isSaveUserInfoError } =
    useSelector(({ profile }) => ({
      isSaveUserInfoSuccess: profile.updateUserInfo.success,
      isSaveUserInfoLoading: profile.updateUserInfo.loading,
      isSaveUserInfoError: profile.updateUserInfo.error,
    }));

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

  const handleCancel = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(resetGetUserInfo());
      dispatch(getUserInfo());
    },
    [dispatch]
  );

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
          disabled={
            !isGetUserInfoSuccess ||
            isGetUserInfoLoading ||
            isSaveUserInfoLoading
          }
        >
          Сохранить
        </Button>
        <Button
          type="secondary"
          size="medium"
          htmlType="button"
          onClick={handleCancel}
          disabled={
            !isGetUserInfoSuccess ||
            isGetUserInfoLoading ||
            isSaveUserInfoLoading
          }
        >
          Отменить
        </Button>
      </div>
      {isGetUserInfoError && (
        <span className="error-message mt-10 text text_type_main-default">
          Ошибка загрузки данных пользователя.
        </span>
      )}
      {isSaveUserInfoError && (
        <span className="error-message mt-10 text text_type_main-default">
          Ошибка сохранения данных пользователя.
        </span>
      )}
      {isSaveUserInfoSuccess && (
        <span className="mt-10 text text_type_main-default">
          Данные успешно сохранены.
        </span>
      )}
    </form>
  );
};

export default AccountInfo;
