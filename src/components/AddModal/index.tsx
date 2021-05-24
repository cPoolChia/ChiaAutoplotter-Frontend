import React, { useState, useRef, useEffect } from "react";
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
import AddCircleIcon from "@material-ui/icons/AddCircle";

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
  const [currFields, setCurrFields] = useState<FieldsType[]>(fields);
  const btnRef = useRef<any>(null);
  const handleClose = () => setOpen(false);

  const enterKeyListener = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      console.log("enter pressed");
      btnRef?.current?.click();
    }
  };

  const addFieldHandler = (field: FieldsType) => {
    const newField = Object.assign({}, field);
    const nameLength = field.name.length;
    const nameWithoutId = field.name.slice(0, nameLength - 1);
    const id = Number(field.name.slice(nameLength - 1, nameLength));
    newField.name = nameWithoutId + (id + 1);
    newField.id = field.id ? field.id + 1 : undefined;
    setCurrFields([...currFields, newField]);
  };

  const isFieldLastMultiple = (field: FieldsType) => {
    const length = currFields.length;
    return currFields[length - 1] === field ? true : false;
  };

  useEffect(() => {
    if (open) {
      window.addEventListener("keypress", enterKeyListener);
    }
    return () => {
      window.removeEventListener("keypress", enterKeyListener);
      setTimeout(() => setCurrFields(fields), 500); //for animation to be smooth
    };
  }, [open, fields]);

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
                {currFields.map((field) => (
                  <Grid key={field.name} item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      id={field.id}
                      label={field.label}
                      name={field.name}
                      autoComplete={field.autoComplete}
                    />
                    {field.multiple && isFieldLastMultiple(field) ? (
                      <Button
                        style={{ marginTop: 15 }}
                        color="primary"
                        variant="contained"
                        onClick={() => addFieldHandler(field)}
                      >
                        <AddCircleIcon style={{ marginRight: 8 }} />
                        {`Add ${field.label}`}
                      </Button>
                    ) : null}
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
