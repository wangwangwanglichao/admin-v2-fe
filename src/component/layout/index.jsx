import React from "react";
import NavTop from "component/nav-top/index.jsx";
import NavSide from "component/nav-side/index.jsx";

import "./theme.css";
import "./index.scss";

export default class Layout extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div id="wrapper">
        <NavTop/>
        <NavSide/>
        {this.props.children}
      </div>
    )
  }
}