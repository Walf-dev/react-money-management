import React from "react";

import ReactDOM from "react-dom";

import { MemoryRouter } from "react-router-dom";

import DashboardPage from "./DashboardPage";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MemoryRouter>
      <DashboardPage title="" />
    </MemoryRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
