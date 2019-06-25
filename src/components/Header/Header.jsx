import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../store/actions";
import Modal from "../Modal/Modal";
import { formatarData } from "../../util/funcoes";

import dashboardRoutes from "../../routes/dashboardRoutes";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
  }

  mobileSidebarToggle(e) {
    //toogle do menu
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
  }

  componentWillMount() {
    document.documentElement.classList.remove("nav-open");
  }

  getBrand() {
    // pega nome da view atual
    let name;
    dashboardRoutes.forEach(prop => {
      if (prop.path === this.props.location.pathname) {
        name = prop.name;
      }
    });
    return name;
  }

  render() {
    return (
      <div>
        <Modal
          props={{
            show: this.state.showModal,
            onHide: () => this.setState({ showModal: false })
          }}
          title="Selecionar controlador"
          content={
            <div className="lista-controladores">
              {this.props.controladores.map((controlador, index) => {
                return (
                  <div
                    className="controlador-item"
                    key={index}
                    onClick={() => {
                      this.setState({ showModal: false });
                      this.props.setControlador(controlador.numeroSerie);
                    }}
                  >
                    <div>
                      <div>
                        <b>NS:</b> {controlador.numeroSerie}
                      </div>
                      <div>
                        <b>Nome: </b>
                        {controlador.descricao}
                      </div>
                    </div>
                    <div>
                      <b>Ultima conexão: </b>
                      {formatarData(controlador.dataAcesso)}
                    </div>
                  </div>
                );
              })}
            </div>
          }
        />
        <nav className="nav-bar-container">
          <div>
            <div className="botao-controlador" onClick={() => this.setState({ showModal: true })}>
              <FontAwesomeIcon icon="hand-point-up" style={{ fontSize: "22px" }} />
              <div> Selecionar</div>
            </div>
            <div className="divisor" />
            <span className="nav-bar-brand"> {this.getBrand()}</span>
          </div>

          <button type="button" className="nav-bar-toggle" onClick={this.mobileSidebarToggle}>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>

          <div className="usuario-info">
            <span>Usuário : {this.props.usuario.nome}</span>
            <span>
              Controlador :{" "}
              {this.props.controladorSelecionado
                ? this.props.controladores.filter(c => c.numeroSerie === this.props.controladorSelecionado)[0].descricao
                : this.props.controladorSelecionado}
            </span>
          </div>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  controladorSelecionado: state.controladorSelecionado,
  controladores: state.controladores,
  usuario: state.usuario,
  controlador: state.controladorSelecionado
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
