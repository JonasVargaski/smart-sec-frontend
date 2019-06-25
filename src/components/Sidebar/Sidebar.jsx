import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../store/actions";

import imagine from "../../assets/img/sidebar-3.jpg";
import logo from "../../assets/img/logo.png";

import componentRoutes from "../../routes/dashboardRoutes";

class Sidebar extends Component {
  activeRoute(routeName) {
    return this.props.location.pathname === routeName ? "active" : "";
  }
  toggleSidebar() {
    document.documentElement.classList.toggle("nav-open");
  }
  render() {
    const { logout } = this.props;
    const sidebarBackground = {
      backgroundImage: "url(" + imagine + ")"
    };
    let componentesAcesso = componentRoutes.filter(component => this.props.usuario.acesso.includes(component.code));
    return (
      <div id="sidebar" className="sidebar" data-color="black" data-image={imagine}>
        <div className="sidebar-background" style={sidebarBackground} />
        <div className="logo-tech">
          <img src={logo} alt="logo_image" />
          <div>
            <b> TECHNOW </b>
            <br />
            <span>Sistemas Embarcados</span>
          </div>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {componentesAcesso.map((prop, key) => {
              return (
                <li className={this.activeRoute(prop.path)} key={key}>
                  <Link
                    to={prop.path}
                    className="nav-link"
                    activeclassname="active"
                    onClick={() => this.toggleSidebar()}
                  >
                    {/* <i className={prop.icon} /> */}
                    <FontAwesomeIcon icon={prop.icon} />

                    <p>{prop.name}</p>
                  </Link>
                </li>
              );
            })}
            <li
              onClick={() => {
                logout();
                localStorage.removeItem("token");
              }}
            >
              <Link to="/app/login" className="nav-link" activeclassname="active">
                <FontAwesomeIcon icon="reply" />
                <p>Sair</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  usuario: state.usuario,
  autenticado: state.autenticado
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
