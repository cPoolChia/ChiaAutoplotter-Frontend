import React from "react";
import { Container, CssBaseline } from "@material-ui/core";
import { Header } from "../components";

type Props = {
  children: React.ReactNode;
};

export const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <CssBaseline />
      <Header />
      {children}
    </Container>
  );
};
