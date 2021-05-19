import { Route, Redirect } from "react-router-dom";

import authService from "../services/AuthService";

interface Props {
  children: React.ReactChildren | React.ReactNode | React.ReactElement;
  path: string;
}

export const PrivateRoute: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authService.getJwtTokenFromStorage() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
