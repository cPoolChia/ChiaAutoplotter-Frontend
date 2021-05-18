import React from "react";
import { Container } from "@material-ui/core";

interface Props {
  ServersDataGrid: React.ReactChild;
}

export const ServersPage: React.FC<Props> = ({ ServersDataGrid }) => {
  return <Container>{ServersDataGrid}</Container>;
};
