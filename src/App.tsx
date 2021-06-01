import React from "react";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { GlobalStateProvider } from "./common/GlobalState/provider/GlobalStateProvider";
import { Router } from "./common/routes";

function App() {
  return (
    <GlobalStateProvider>
      <Router />
      <NotificationContainer />
    </GlobalStateProvider>
  );
}

export default App;
