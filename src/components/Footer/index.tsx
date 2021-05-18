import React from "react";

export const Footer: React.VFC = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "absolute",
        bottom: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      CPOOL 2021, ALL RIGHTS RESERVED
    </footer>
  );
};
