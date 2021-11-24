import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useReducer, useEffect } from "react";
import { useGetCurrentUser } from "../auth/auth";
import { UserContext, DispatchUserContext } from "../state/contexts/contexts";
import reducer from "../state/reducer/reducer.js";
import { INITIAL_STATE } from "../state/initial_state.js";

// layouts
import DashboardLayout from "../layouts/dashboard";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
//
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardApp from "../pages/DashboardApp";
//import Products from "../pages/Products";
import Blog from "../pages/Blog";
import User from "../pages/User";
import NotFound from "../pages/Page404";
import firebase, { auth } from "../firebase";
import PrivateRoute from "./PrivateRoute";
// ----------------------------------------------------------------------

export default function AppRoutes() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const user = useGetCurrentUser();
  useEffect(() => {
    dispatch({ type: "GET_CURRENT_USER", payload: user });
  }, [user]);

  return (
    <Router basename="/">
      <Switch>
        <Route exact path="/" component={Login}/>
        <PrivateRoute exact path="/dashboard/app" component={DashboardApp}/>
        <PrivateRoute exact path="/dashboard/user" component={User}/>
        {/*<PrivateRoute exact path="/dashboard/products" component={Products}/>*/}
        <PrivateRoute exact path="/dashboard/blog" component={Blog}/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="*" component={NotFound} />
        <Route exact path="404" component={NotFound} />
      </Switch>
    </Router>
  );
}
