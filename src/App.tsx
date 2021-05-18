import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { LoginLayout } from "./layouts/LoginLayout";
import { ServersPageContainer as ServersPage } from "./pages/ServersPage/ServersPageContainer";
import { LoginPage } from "./pages/LoginPage";
import { SingleServerPageContainer as SingleServerPage } from "./pages/SingleServerPage/SingleServerPageContainer";
import "react-notifications/lib/notifications.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <PrivateRoute path="/servers"> */}
        <Route path="/servers">
          <DefaultLayout>
            <ServersPage />
          </DefaultLayout>
        </Route>
        <Route path="/server/:id">
          <DefaultLayout>
            <SingleServerPage />
          </DefaultLayout>
        </Route>
        {/* </PrivateRoute> */}
        <Route exact path="/login">
          <LoginLayout>
            <LoginPage />
          </LoginLayout>
        </Route>
        {/* <Route path="/">
          <IndexPage />
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
