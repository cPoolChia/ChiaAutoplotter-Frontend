import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { TextField } from "mui-rff";
import React from "react";
import { Form } from "react-final-form";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  submitHandler: (fields: any) => Promise<void>;
  fields: { [key: string]: any }[];
}

export const EditDataModal: React.FC<Props> = ({
  open,
  setOpen,
  submitHandler,
  fields,
  title,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      scroll="paper"
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Form
          onSubmit={submitHandler}
          render={({ handleSubmit }) => (
            <form>
              <Grid
                container
                spacing={2}
                direction="column"
                justify="center"
                alignItems="stretch"
              >
                {fields.map((field) => (
                  <Grid key={field.name} item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      id={field.id}
                      label={field.label}
                      name={field.name}
                      value={field.defaultValue}
                      autoComplete={field.autoComplete}
                    />
                  </Grid>
                ))}
              </Grid>
              <DialogActions>
                <Button
                  onClick={handleSubmit}
                  variant="outlined"
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </Button>
              </DialogActions>
            </form>
          )}
        />
      </DialogContent>
    </Dialog>
  );
};
