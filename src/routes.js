import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardApp from "./pages/DashboardApp";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import User from "./pages/User";
import NotFound from "./pages/Page404";
import firebase, { auth } from "./firebase";

// ----------------------------------------------------------------------

function PrivateRoute({ children }) {
  return auth.currentUser ? children : <Navigate to="/login" />;
}

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          element: (
            <PrivateRoute>
              <Navigate to="/dashboard/app" replace />
            </PrivateRoute>
          ),
        },
        {
          path: "app",
          element: (
            <PrivateRoute>
              <DashboardApp />
            </PrivateRoute>
          ),
        },
        {
          path: "user",
          element: (
            <PrivateRoute>
              <User />
            </PrivateRoute>
          ),
        },
        {
          path: "products",
          element: (
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          ),
        },
        {
          path: "blog",
          element: (
            <PrivateRoute>
              <Blog />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/dashboard" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
