import React from "react";
import {
  Grid,
  Button,
  Link,
  InputAdornment,
  IconButton,
  Paper,
} from "@material-ui/core";
import { TextField, Checkboxes } from "mui-rff";
import { Form } from "react-final-form";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { ReactComponent as CpoolLogo } from "../../assets/images/cpool-2.svg";
import { useStyles } from "./styles";

type Props = {
  showPassword: boolean;
  loginHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  formStateToggler: (e: React.MouseEvent) => void;
  handleClickShowPassword: () => void;
};

export interface ValuesType {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const LoginForm: React.VFC<Props> = ({
  showPassword,
  handleClickShowPassword,
  loginHandler,
  formStateToggler,
}) => {
  const classes = useStyles();

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = "This field is required.";
    }
    if (!values.password) {
      errors.password = "This field is required.";
    }
    return errors;
  };

  return (
    <Paper className={classes.paper}>
      <CpoolLogo style={{ width: 400 }} />
      <Form
        onSubmit={loginHandler}
        initialValues={{ rememberMe: false }}
        validate={validate}
        render={({ handleSubmit }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            <fieldset className={classes.fieldset}>
              <Grid
                container
                spacing={2}
                direction="column"
                justify="center"
                alignItems="stretch"
              >
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    required
                    id="email"
                    label={"Username / Email"}
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    required
                    name="password"
                    label={"Password"}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    id="password"
                    autoComplete="password"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Checkboxes
                  name="rememberMe"
                  color="primary"
                  data={{
                    label: "Remember me",
                    value: false,
                  }}
                />
              </Grid>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
                className={classes.submit}
              >
                {"Login"}
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    className={classes.link}
                    variant="body2"
                    onClick={formStateToggler}
                  >
                    {"Forgot password?"}
                  </Link>
                </Grid>
              </Grid>
            </fieldset>
          </form>
        )}
      />
    </Paper>
  );
};
