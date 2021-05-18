import React from "react";
import { Container, CssBaseline } from "@material-ui/core";
import { Sidebar } from "../components";

type Props = {
  children: React.ReactNode;
};

export const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <CssBaseline />
      <Sidebar />
      <div style={{ marginLeft: 130 }}>{children}</div>
    </Container>
  );
};
