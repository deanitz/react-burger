import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  getUserInfo,
  resetGetUserInfo,
  resetUpdateUserInfo,
  updateUserInfo,
} from "../../../services/slices/profileSlice";
import { setInfoText } from "../../../services/slices/profileTextSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/store";
import {
  FormSubmitEventFunc,
  InputChangeEventFunc,
} from "../../../types/utilityTypes";

const defaultAccountInfoState: {
  name: string;
  email: string;
  password: string;
  originalName: string;
  originalEmail: string;
} = {
  name: "",
  email: "",
  password: "",
  originalName: "",
  originalEmail: "",
};

const AccountInfo = () => {
  const dispatch = useAppDispatch();

  const {
    isGetUserInfoSuccess,
    isGetUserInfoLoading,
    isGetUserInfoError,
    userInfo,
  } = useAppSelector(({ profile }) => ({
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
      setIsDataSaved(false);
      setState({
        name: userInfo?.name ?? "",
        email: userInfo?.email ?? "",
        password: "",
        originalName: userInfo?.name ?? "",
        originalEmail: userInfo?.email ?? "",
      });
      return;
    }
  }, [isGetUserInfoSuccess, userInfo]);

  useEffect(() => {
    setState(defaultAccountInfoState);
    dispatch(getUserInfo());

    return () => {
      dispatch(resetGetUserInfo());
      dispatch(resetUpdateUserInfo());
    };
  }, [dispatch]);

  const [state, setState] = useState(defaultAccountInfoState);
  const [isDataSaved, setIsDataSaved] = useState(false);

  const onChange = (e: InputChangeEventFunc) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const { isSaveUserInfoSuccess, isSaveUserInfoLoading, isSaveUserInfoError } =
    useAppSelector(({ profile }) => ({
      isSaveUserInfoSuccess: profile.updateUserInfo.success,
      isSaveUserInfoLoading: profile.updateUserInfo.loading,
      isSaveUserInfoError: profile.updateUserInfo.error,
    }));

  const handleSave = useCallback(
    (e: FormSubmitEventFunc) => {
      e.preventDefault();

      setIsDataSaved(false);
      dispatch(
        updateUserInfo({
          ...state,
        })
      );
    },
    [dispatch, state]
  );

  useEffect(() => {
    if (isSaveUserInfoSuccess) {
      dispatch(resetUpdateUserInfo());
      setIsDataSaved(true);
      setState((state) => ({
        ...state,
        originalName: state.name,
        originalEmail: state.email,
        password: "",
      }));
    }
  }, [dispatch, isSaveUserInfoSuccess]);

  const handleCancel = useCallback(
    (e: React.SyntheticEvent<Element, Event>) => {
      e.preventDefault();

      dispatch(resetUpdateUserInfo());
      setState({
        ...state,
        name: state.originalName,
        email: state.originalEmail,
        password: "",
      });
      setIsDataSaved(false);
    },
    [state, dispatch]
  );

  const { isNameChanged, isEmailChanged, isPasswordChanged } = useMemo(() => {
    const isNameChanged = state.name !== state.originalName;
    const isEmailChanged = state.email !== state.originalEmail;
    const isPasswordChanged = Boolean(state.password.length);

    return { isNameChanged, isEmailChanged, isPasswordChanged };
  }, [state]);

  useEffect(() => {
    if (isNameChanged || isEmailChanged || isPasswordChanged) {
      setIsDataSaved(false);
    }
  }, [isNameChanged, isEmailChanged, isPasswordChanged]);

  useEffect(() => {
    dispatch(
      setInfoText("В этом разделе вы можете изменить свои персональные данные")
    );
  }, [dispatch]);

  return (
    <form className="page-form" onSubmit={handleSave}>
      <div className="mt-6">
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={state.name}
          name={"name"}
          errorText={"Ошибка ввода имени"}
          icon={isNameChanged ? "EditIcon" : "HideIcon"}
        />
      </div>
      <div className="mt-6">
        <EmailInput
          onChange={onChange}
          value={state.email}
          name={"email"}
          isIcon={isEmailChanged}
        />
      </div>
      <div className="mt-6">
        <PasswordInput
          onChange={onChange}
          value={state.password}
          name={"password"}
        />
      </div>
      {(isNameChanged || isEmailChanged || isPasswordChanged) &&
        isGetUserInfoSuccess && (
          <div className="mt-6">
            <Button
              type="primary"
              size="medium"
              htmlType="submit"
              disabled={
                !isGetUserInfoSuccess ||
                isGetUserInfoLoading ||
                isSaveUserInfoLoading ||
                !state?.name?.length ||
                !state?.email?.length
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
        )}
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
      {isDataSaved && (
        <span className="mt-10 text text_type_main-default">
          Данные успешно сохранены.
        </span>
      )}
    </form>
  );
};

export default AccountInfo;