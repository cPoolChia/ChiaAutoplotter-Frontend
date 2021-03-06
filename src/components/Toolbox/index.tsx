import React, { useState } from "react";
import { AddModal } from "../AddModal";
import { FieldsType } from "../AddModal/types";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Button } from "@material-ui/core";
import { useStyles } from "./styles";
import { NotificationManager } from "react-notifications";

interface Props {
  submitHandler: (fields: any) => Promise<void>;
  modalFields: FieldsType[];
  title: string;
}

export const Toolbox: React.FC<Props> = ({
  submitHandler,
  modalFields,
  title,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const submit = async (fields: any) => {
    try {
      await submitHandler(fields);
      setOpen(false);
    } catch (error) {
      NotificationManager.error(error.message);
    }
  };

  const classes = useStyles();

  return (
    <>
      <AddModal
        open={open}
        setOpen={setOpen}
        submitHandler={submit}
        title={title}
        fields={modalFields}
      />
      <div className={classes.toolbox}>
        <Button
          onClick={() => setOpen(true)}
          color="primary"
          variant="contained"
        >
          <AddCircleIcon className={classes.buttonIcon} />
          {title}
        </Button>
      </div>
    </>
  );
};
