import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { LoginLayout } from "./layouts/LoginLayout";
import { ServersPageContainer as ServersPage } from "./pages/ServersPage/ServersPageContainer";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { SingleServerPageContainer as SingleServerPage } from "./pages/SingleServerPage/SingleServerPageContainer";
import { SinglePlotPageContainer as SinglePlotPage } from "./pages/SinglePlotPage/SinglePlotPageContainer";
import { NotificationContainer } from "react-notifications";
import { PlotsPageContainer as PlotsPage } from "./pages/PlotsPage/PlotsPageContainer";
import "react-notifications/lib/notifications.css";
import { TaskPage } from "./pages/TaskPage/TaskPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/servers/:id">
            <DefaultLayout>
              <SingleServerPage />
            </DefaultLayout>
          </PrivateRoute>
          <PrivateRoute path="/servers">
            <DefaultLayout>
              <ServersPage />
            </DefaultLayout>
          </PrivateRoute>
          <PrivateRoute path="/plots/:id">
            <DefaultLayout>
              <SinglePlotPage />
            </DefaultLayout>
          </PrivateRoute>
          <PrivateRoute path="/tasks/:id">
            <DefaultLayout>
              <TaskPage />
            </DefaultLayout>
          </PrivateRoute>
          <PrivateRoute path="/plots">
            <DefaultLayout>
              <PlotsPage />
            </DefaultLayout>
          </PrivateRoute>
          <Route exact path="/login">
            <LoginLayout>
              <LoginPage />
            </LoginLayout>
          </Route>
          <Route exact path="/">
            <Redirect to="/servers" />
          </Route>
          {/* <Route path="/">
          <IndexPage />
        </Route> */}
        </Switch>
      </BrowserRouter>
      <NotificationContainer />
    </>
  );
}

export default App;
