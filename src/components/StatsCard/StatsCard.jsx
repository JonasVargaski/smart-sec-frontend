import React, { Component } from "react";
import "./StatsCard.css";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class StatsCard extends Component {
  render() {
    return (
      <div className="card card-stats">
        <div className="content">
          <Row>
            <Col xs={2}>
              <FontAwesomeIcon {...this.props.icon} size="3x" className="m-1" />
            </Col>
            <Col xs={this.props.cards ? 5 : 10}>
              <div className="numbers atr-card">
                <p>{this.props.text1}</p>
                <span>{this.props.value1}</span>
              </div>
            </Col>
            {this.props.cards ? (
              <Col xs={5}>
                <div className="numbers atr-card">
                  <p>{this.props.text2}</p>
                  <span>{this.props.value2}</span>
                </div>
              </Col>
            ) : null}
          </Row>
          <div className="footer">
            <hr />
            <div className="stats">
              {this.props.statsIcon} {this.props.statsIconText}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StatsCard;
