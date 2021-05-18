import React, { useRef, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { TextField } from "mui-rff";
import { Form } from "react-final-form";
import { FieldsType } from "./types";

interface Props {
  open: boolean;
  setOpen: (x: boolean) => void;
  submitHandler: (fields: any) => Promise<void>;
  title: string;
  fields: Array<FieldsType>;
}

export const AddModal: React.FC<Props> = ({
  open,
  setOpen,
  submitHandler,
  fields,
  title,
}) => {
  const btnRef = useRef<any>(null);
  const handleClose = () => setOpen(false);

  const enterKeyListener = (event: KeyboardEvent) => {
    console.log("enter pressed");
    if (event.key === "Enter") {
      btnRef?.current?.click();
    }
  };

  useEffect(() => {
    if (open) {
      window.addEventListener("keypress", enterKeyListener);
    }
    return () => window.removeEventListener("keypress", enterKeyListener);
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
                      autoComplete={field.autoComplete}
                    />
                  </Grid>
                ))}
              </Grid>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button
                  ref={btnRef}
                  onClick={handleSubmit}
                  variant="outlined"
                  color="primary"
                >
                  Add
                </Button>
              </DialogActions>
            </form>
          )}
        />
      </DialogContent>
    </Dialog>
  );
};
