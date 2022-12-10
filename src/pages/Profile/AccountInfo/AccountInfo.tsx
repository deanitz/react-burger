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
import { FormSubmitEventFunc } from "../../../types/utilityTypes";
import { useForm } from "../../../hooks/useForm";

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
      setValues({
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
    setValues(defaultAccountInfoState);
    dispatch(getUserInfo());

    return () => {
      dispatch(resetGetUserInfo());
      dispatch(resetUpdateUserInfo());
    };
  }, [dispatch]);

  const [isDataSaved, setIsDataSaved] = useState(false);
  const { values, handleChange, setValues } = useForm(defaultAccountInfoState);

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
          ...values,
        })
      );
    },
    [dispatch, values]
  );

  useEffect(() => {
    if (isSaveUserInfoSuccess) {
      dispatch(resetUpdateUserInfo());
      setIsDataSaved(true);
      setValues((values) => ({
        ...values,
        originalName: values.name,
        originalEmail: values.email,
        password: "",
      }));
    }
  }, [dispatch, isSaveUserInfoSuccess]);

  const handleCancel = useCallback(
    (e: React.SyntheticEvent<Element, Event>) => {
      e.preventDefault();

      dispatch(resetUpdateUserInfo());
      setValues({
        ...values,
        name: values.originalName,
        email: values.originalEmail,
        password: "",
      });
      setIsDataSaved(false);
    },
    [values, dispatch]
  );

  const { isNameChanged, isEmailChanged, isPasswordChanged } = useMemo(() => {
    const isNameChanged = values.name !== values.originalName;
    const isEmailChanged = values.email !== values.originalEmail;
    const isPasswordChanged = Boolean(values.password.length);

    return { isNameChanged, isEmailChanged, isPasswordChanged };
  }, [values]);

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
          onChange={handleChange}
          value={values.name}
          name={"name"}
          errorText={"Ошибка ввода имени"}
          icon={isNameChanged ? "EditIcon" : "HideIcon"}
        />
      </div>
      <div className="mt-6">
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={"email"}
          isIcon={isEmailChanged}
        />
      </div>
      <div className="mt-6">
        <PasswordInput
          onChange={handleChange}
          value={values.password}
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
                !values?.name?.length ||
                !values?.email?.length
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
