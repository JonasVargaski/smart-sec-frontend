import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../store/actions";
import api from "../../services/api";

import { toast } from "react-toastify";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import componentRoutes from "../../routes/dashboardRoutes";
import "./Dashboard.css";

class Dashboard extends Component {
  async buscarControladores() {
    try {
      let res = await api.get(`/usuario/controlador/${this.props.usuario.id}`);
      this.props.setControladores(res.data);
    } catch (error) {}
  }

  componentDidMount() {
    this.buscarControladores();
    toast.info(`Bem Vindo ${this.props.usuario.nome} !`, {
      position: "top-center",
      closeOnClick: true
    });
  }

  render() {
    let componentesAcesso = componentRoutes.filter(component => this.props.usuario.acesso.includes(component.code));
    return (
      <div className="wrapper">
        <Sidebar {...this.props} />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header {...this.props} />
          {componentesAcesso.map((prop, key) => {
            return <Route path={prop.path} key={key} render={routeProps => <prop.component {...routeProps} />} />;
          })}
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  usuario: state.usuario,
  controladores: state.controladores
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
