import React, { Component } from "react";

export default class Input extends Component {
  render() {
    return (
      <div className="form-input">
        <input name="email" {...this.props.proprieties} />
      </div>
    );
  }
}
