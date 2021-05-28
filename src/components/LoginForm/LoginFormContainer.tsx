import React, { useState, useEffect } from "react";
import { NotificationManager } from "react-notifications";
import { useHistory } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { PasswordResetForm } from "./PasswordResetForm";
import authService from "../../services/AuthService";
import AuthService from "../../services/AuthService";

enum FormState {
  Default = "DEFAULT",
  PasswordReset = "PASSWORD_RESET",
}

export type FormErrorsType = {
  userNotFound?: string;
};

export const LoginFormContainer: React.FC = () => {
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState<FormState>(FormState.Default);

  useEffect(() => {
    if (authService.getJwtTokenFromStorage()) history.push("/");
  }, [history]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const loginHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    const { email, password, rememberMe } = e as any;
    try {
      await AuthService.login(email.trim(), password, rememberMe);
      history.push("/servers");
    } catch (error) {
      NotificationManager.error(error.message);
    }
  };

  // const passwordResetHandler = async (
  //   e: React.FormEvent<HTMLFormElement>
  // ): Promise<void> => {
  //   const { userdata } = e as any;
  //   try {
  //     await authService.passwordRecovery(userdata);
  //     NotificationManager.success("SUCCESS");
  //   } catch (error) {
  //     console.error(error);
  //     NotificationManager.error(error, "ERROR_MSG");
  //   }
  // };

  const formStateToggler = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (formState === FormState.PasswordReset) {
      setFormState(FormState.Default);
    } else {
      setFormState(FormState.PasswordReset);
    }
  };

  // return formState === "DEFAULT" ? (
  return (
    <LoginForm
      loginHandler={loginHandler}
      handleClickShowPassword={handleClickShowPassword}
      showPassword={showPassword}
      formStateToggler={formStateToggler}
    />
  );
  // ) : (
  //   <PasswordResetForm
  //     formStateToggler={formStateToggler}
  //     passwordResetHandler={passwordResetHandler}
  //   />
  // );
};
