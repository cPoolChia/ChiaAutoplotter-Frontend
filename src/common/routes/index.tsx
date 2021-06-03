import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { LoginLayout } from "../../layouts/LoginLayout";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { useGlobalState } from "../GlobalState/hooks/useGlobalState";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DefaultLayout } from "../../layouts/DefaultLayout";
import { SingleServerPageContainer as SingleServerPage } from "../../pages/SingleServerPage/SingleServerPageContainer";
import { ServersPageContainer as ServersPage } from "../../pages/ServersPage/ServersPageContainer";
import { SinglePlotPageContainer as SinglePlotPage } from "../../pages/SinglePlotPage/SinglePlotPageContainer";
import { TaskPage } from "../../pages/TaskPage/TaskPage";
import { PlotsPageContainer as PlotsPage } from "../../pages/PlotsPage/PlotsPageContainer";
import { SingleDirectoryPageContainer as SingleDirectoryPage } from "../../pages/SingleDirectoryPage/SingleDirectoryPageContainer";

export const Router: React.FC = () => {
  const [globalState] = useGlobalState();
  console.log(globalState);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <LoginLayout>
            <LoginPage />
          </LoginLayout>
        </Route>
        {!globalState.isAuthenticated ? (
          <Redirect to="/login" />
        ) : globalState.isAuthenticated && !globalState.hasLoaded ? (
          <CircularProgress />
        ) : (
          <>
            <Route exact path="/servers/:id">
              <DefaultLayout>
                <SingleServerPage />
              </DefaultLayout>
            </Route>
            <Route exact path="/servers">
              <DefaultLayout>
                <ServersPage />
              </DefaultLayout>
            </Route>
            <Route exact path="/plots/:id">
              <DefaultLayout>
                <SinglePlotPage />
              </DefaultLayout>
            </Route>
            <Route exact path="/tasks/:id">
              <DefaultLayout>
                <TaskPage />
              </DefaultLayout>
            </Route>
            <Route exact path="/directories/:id">
              <DefaultLayout>
                <SingleDirectoryPage />
              </DefaultLayout>
            </Route>
            <Route exact path="/plots">
              <DefaultLayout>
                <PlotsPage />
              </DefaultLayout>
            </Route>
            <Route exact path="/">
              <Redirect to="/servers" />
            </Route>
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};
