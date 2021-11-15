import React, { useReducer, useEffect } from "react";
import { UserContext, DispatchUserContext } from "./state/contexts/contexts";
import { useGetCurrentUser } from "./auth/auth";
import reducer from "./state/reducer/reducer.js";
import { INITIAL_STATE } from "./state/initial_state.js";

// routes
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// components
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";

// ----------------------------------------------------------------------

export default function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  console.log(state);
  const user = useGetCurrentUser();
  useEffect(() => {
    dispatch({ type: "GET_CURRENT_USER", payload: user });
  }, [user]);

  return (
    <UserContext.Provider value={state}>
      <DispatchUserContext.Provider value={dispatch}>
        <ThemeConfig>
          <ScrollToTop />
          <GlobalStyles />
          <BaseOptionChartStyle />
          <Router />
        </ThemeConfig>
      </DispatchUserContext.Provider>
    </UserContext.Provider>
  );
}
