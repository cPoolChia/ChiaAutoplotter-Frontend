import React, { useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  Button,
  Link,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Form } from "react-final-form";
import { TextField } from "mui-rff";
import { useStyles } from "./styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

type Props = {
  passwordResetHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  formStateToggler: (e: React.MouseEvent) => void;
};

export const PasswordResetForm: React.VFC<Props> = ({
  passwordResetHandler,
  formStateToggler,
}) => {
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const classes = useStyles();

  const handleClickShowPassword = (type: string) => {
    switch (type) {
      case "oldPassword":
        setShowOldPassword(!showOldPassword);
        break;
      case "newPassword":
        setShowNewPassword(!showNewPassword);
    }
  };

  return (
    <Paper className={classes.paper}>
      <Typography component="h1" variant="h5">
        {"Reset password"}
      </Typography>
      <Form
        onSubmit={passwordResetHandler}
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
                    name="oldPassword"
                    label="Old Password"
                    type={showOldPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              handleClickShowPassword("oldPassword")
                            }
                          >
                            {showOldPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    id="oldPassword"
                    autoComplete="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    required
                    name="newPassword"
                    label="New Password"
                    type={showNewPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              handleClickShowPassword("newPassword")
                            }
                          >
                            {showNewPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    id="newPassword"
                    autoComplete="password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
                className={classes.submit}
              >
                {"Reset password"}
              </Button>
              <Link
                className={classes.link}
                variant="body2"
                onClick={formStateToggler}
              >
                &#8592; {"Back"}
              </Link>
            </fieldset>
          </form>
        )}
      />
    </Paper>
  );
};
