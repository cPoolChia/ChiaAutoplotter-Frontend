import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { LoginLayout } from "./layouts/LoginLayout";
import { ServersPageContainer as ServersPage } from "./pages/ServersPage/ServersPageContainer";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { SingleServerPageContainer as SingleServerPage } from "./pages/SingleServerPage/SingleServerPageContainer";
import { SinglePlotPageContainer as SinglePlotPage } from "./pages/SinglePlotPage/SinglePlotPageContainer";
import "react-notifications/lib/notifications.css";
import { PlotsPageContainer as PlotsPage } from "./pages/PlotsPage/PlotsPageContainer";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/servers/:id">
          <DefaultLayout>
            <SingleServerPage />
          </DefaultLayout>
        </Route>
        <Route path="/servers">
          <DefaultLayout>
            <ServersPage />
          </DefaultLayout>
        </Route>
        <Route path="/plots/:id">
          <DefaultLayout>
            <SinglePlotPage />
          </DefaultLayout>
        </Route>
        <Route path="/plots">
          <DefaultLayout>
            <PlotsPage />
          </DefaultLayout>
        </Route>
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
