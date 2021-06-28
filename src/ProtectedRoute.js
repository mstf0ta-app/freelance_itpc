import React,{useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import { GlobalContext } from './contexts/GlobalContext';

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  const {loggedIn} = useContext(GlobalContext)

  return (
    <Route
      {...rest}
      render={props => {
        if (loggedIn == true) {
          return <Component {...props} data={rest.data}/>;
        } else {
          return (
            <Redirect
              to={{
                pathname: "Login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
