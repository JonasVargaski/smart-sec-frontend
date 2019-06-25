import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Card.css";

export class Card extends Component {
  render() {
    return (
      <div className={"card" + (this.props.plain ? " card-plain" : "")}>
        {this.props.title ? (
          <div className={"card-fundo"}>
            <h3 className="card-titulo">
              {this.props.icon ? (
                <FontAwesomeIcon
                  {...this.props.icon}
                  style={{ fontSize: this.props.icon.fontSize || "" }}
                  className="mr-2"
                />
              ) : null}
              {/* <i className={this.props.icon} /> {this.props.title} */}
              {this.props.title}
            </h3>
            <p className="category">{this.props.category}</p>
          </div>
        ) : (
          ""
        )}
        <div
          className={
            "content " +
            (this.props.bsClass ? this.props.bsClass : " ") +
            (this.props.ctAllIcons ? " all-icons" : " ") +
            (this.props.ctTableFullWidth ? " table-full-width" : " ") +
            (this.props.ctTableResponsive ? " table-responsive" : " ") +
            (this.props.ctTableUpgrade ? " table-upgrade" : " ")
          }
        >
          {this.props.content}

          <div className="footer">
            {this.props.legend}
            {this.props.stats != null ? <hr /> : ""}
            <div className="stats">
              <i className={this.props.statsIcon} /> {this.props.stats}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
