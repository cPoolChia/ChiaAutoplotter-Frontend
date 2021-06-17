import { MenuItem } from "@material-ui/core";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { Select, TextField } from "mui-rff";
import React from "react";
import { Form } from "react-final-form";
import { DirectoryType } from "../../services/DirectoryService/types";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  submitHandler: (fields: any) => Promise<void>;
  fields: {
    id: string;
    name: string;
    label: string;
    defaultValue?: string | number;
    options?: DirectoryType[];
  }[];
}

export const EditDataModal: React.FC<Props> = ({
  open,
  setOpen,
  submitHandler,
  fields,
  title,
}) => {
  console.log(fields);
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
                {fields.map((field) =>
                  !field.options ? (
                    <Grid key={field.name} item xs={12}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        id={field.id}
                        label={field.label}
                        name={field.name}
                        value={field.defaultValue}
                      />
                    </Grid>
                  ) : (
                    <Grid key={field.name} item xs={12}>
                      <Select
                        fullWidth
                        label={field.label}
                        name={field.name}
                        required={true}
                        value={field.defaultValue}
                      >
                        {field.options.map((option) => (
                          <MenuItem value={option.id}>
                            {option.location}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  )
                )}
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
