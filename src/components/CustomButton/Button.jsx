import React, { Component } from "react";

export default class Button extends Component {
  render() {
    return (
      <div className="form-input">
        <button {...this.props.proprieties}>
          {this.props.label}
          {this.props.content}
        </button>
      </div>
    );
  }
}
