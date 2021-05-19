import React from "react";
import { Container } from "@material-ui/core";

interface Props {
  PlotsDataGrid: React.ReactChild;
}

export const PlotsPage: React.FC<Props> = ({ PlotsDataGrid }) => {
  return <Container>{PlotsDataGrid}</Container>;
};
