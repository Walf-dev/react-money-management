import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useGetCurrentUser } from "../auth/auth";
// layouts
import DashboardLayout from "../layouts/dashboard";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const user = useGetCurrentUser();
  //console.log(user);
  if (user === null)
    return (
      <div>
        Loading...
      </div>
    );
  return (
    <Route
      {...rest}
      render={(props) =>
        !!user ? <DashboardLayout><RouteComponent {...props} /></DashboardLayout> : <Redirect to={"/login"} />
      }
    />
  );
};

export default PrivateRoute;
