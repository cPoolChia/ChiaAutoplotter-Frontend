import React from "react";
import { Container, Paper } from "@material-ui/core";
import { useStyles } from "./styles";

interface Props {
  PlotsDataGrid: React.ReactChild;
}

export const PlotsPage: React.FC<Props> = ({ PlotsDataGrid }) => {
  const classes = useStyles();
  return (
    <Container>
      <Paper className={classes.paper}>{PlotsDataGrid}</Paper>
    </Container>
  );
};
