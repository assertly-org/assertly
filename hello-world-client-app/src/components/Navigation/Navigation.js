import React from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <>
      <NavLink exact to="/" activeClassName="active">
        Form
      </NavLink>
      {" | "}
      <NavLink exact to="/designpatterns" activeClassName="active">
        Design Patterns
      </NavLink>
      {" | "}
      <NavLink exact to="/countercard" activeClassName="active">
        Counter Card
      </NavLink>
    </>
  );
}
