import React from "react";
import { Avatar, Typography, Grid, Button, Link } from "@material-ui/core";
import { Form } from "react-final-form";
import { TextField } from "mui-rff";
import { LockOutlined } from "@material-ui/icons";
import { useStyles } from "./styles";

type Props = {
  passwordResetHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  formStateToggler: (e: React.MouseEvent) => void;
};

export const PasswordResetForm: React.VFC<Props> = ({
  passwordResetHandler,
  formStateToggler,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
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
                <Typography className={classes.forgotText}>
                  {"Don't worry, it's ok, we will handle this together."}
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    required
                    id="userdata"
                    label={"Username / Email"}
                    name="userdata"
                    autoComplete="userdata"
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
              <Link variant="body2" onClick={formStateToggler}>
                &#8592; {"Back"}
              </Link>
            </fieldset>
          </form>
        )}
      />
    </div>
  );
};
