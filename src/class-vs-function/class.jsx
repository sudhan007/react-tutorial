import React, { Component } from "react";
export default class ClassComponents extends Component {
  render() {
    const { props } = this.props;
    return (
      <>
        <h1 style={{ color: "red" }}>{props}</h1>
      </>
    );
  }
}
