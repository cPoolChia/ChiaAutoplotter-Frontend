import React from "react";
import { Container, CssBaseline } from "@material-ui/core";
import { Footer } from "../components";

type Props = {
  children: React.ReactNode;
};

export const LoginLayout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <CssBaseline />
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {children}
      </div>
      <Footer />
    </Container>
  );
};
