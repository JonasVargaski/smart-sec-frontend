import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../store/actions";
import { Col, Table, Form } from "react-bootstrap";
import { Card } from "../../components/Card/Card.jsx";
import Modal from "../../components/Modal/Modal";
import api from "../../services/api";
import { formatarData } from "../../util/funcoes";

class Controller extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
      controladorForm: {
        id: null,
        descricao: "",
        numeroSerie: "",
        senha: ""
      },
      controladorSelecionado: {}
    };

    this.salvarControlador = this.salvarControlador.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.excluirControlador = this.excluirControlador.bind(this);
    this.buscarControladores = this.buscarControladores.bind(this);
    this.visualizarControlador = this.visualizarControlador.bind(this);
    this.editarControlador = this.editarControlador.bind(this);
    this.limparCampos = this.limparCampos.bind(this);
  }

  componentWillMount() {
    this.buscarControladores();
  }

  async buscarControladores() {
    try {
      let res = await api.get(`/usuario/controlador/${this.props.usuario.id}`);
      this.props.setControladores(res.data);
    } catch (error) {}
  }

  visualizarControlador(controlador) {
    this.setState({ controladorSelecionado: controlador, modalShow: true });
  }

  editarControlador(controlador) {
    this.setState({ controladorForm: JSON.parse(JSON.stringify(controlador)) });
  }

  limparCampos(e) {
    e && e.preventDefault();
    let controlador = {
      id: null,
      descricao: "",
      numeroSerie: "",
      senha: ""
    };
    this.setState({ controladorForm: controlador });
  }

  async excluirControlador({ id }) {
    try {
      await api.delete(`/usuario/controlador/${this.props.usuario.id}`, { data: { idEquipamento: id } });
      this.props.setControladores(this.props.controladores.filter(controlador => controlador.id !== id));
      this.setState({ modalShow: false });
      this.buscarControladores();
    } catch (error) {}
  }

  async salvarControlador(e) {
    e.preventDefault();
    try {
      await api.post(`/usuario/controlador/${this.props.usuario.id}`, this.state.controladorForm);
      this.buscarControladores();
      this.limparCampos();
    } catch (error) {}
  }

  async handleInput(e) {
    let controlador = this.state.controladorForm;
    controlador[e.target.name] = e.target.value;
    this.setState({ controladorForm: controlador });
  }
  render() {
    let controlador = this.state.controladorSelecionado;
    return (
      <div className="content">
        <Card
          title="Gerenciar Controladores"
          bsClass="m-0 p-1"
          content={
            <div>
              <Form className="p-3 mb-0">
                <Form.Row>
                  <Form.Group as={Col} sm="12" md="6">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      maxLength="35"
                      onChange={this.handleInput}
                      name="descricao"
                      placeholder="Ex.: Estufa 1"
                      value={this.state.controladorForm.descricao}
                    />
                  </Form.Group>

                  <Form.Group as={Col} sm="12" md="3">
                    <Form.Label>Numero de Série</Form.Label>
                    <Form.Control
                      type="text"
                      maxLength="16"
                      onChange={this.handleInput}
                      name="numeroSerie"
                      placeholder="Ex.: sb48er2a812"
                      value={this.state.controladorForm.numeroSerie}
                      disabled={this.state.controladorForm.id ? true : false}
                    />
                  </Form.Group>

                  <Form.Group as={Col} sm="12" md="3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                      type="text"
                      maxLength="5"
                      onChange={this.handleInput}
                      name="senha"
                      placeholder="Ex.:1234"
                      value={this.state.controladorForm.senha}
                      disabled={this.state.controladorForm.id ? true : false}
                    />
                  </Form.Group>
                </Form.Row>
                <div className="d-flex justify-content-end">
                  <button onClick={e => this.limparCampos(e)} className="btn-fill btn btn-info mr-3 pr-2 ">
                    Limpar
                  </button>
                  <button onClick={e => this.salvarControlador(e)} className="btn-fill btn btn-success mr-3 ">
                    Salvar
                  </button>
                </div>
              </Form>

              <Modal
                props={{
                  show: this.state.modalShow,
                  onHide: () => this.setState({ modalShow: false }, () => this.limparCampos())
                }}
                title="Detalhes"
                footer={
                  <button className="btn-fill btn btn-danger" onClick={() => this.excluirControlador(controlador)}>
                    Excluir
                  </button>
                }
                content={
                  <div className="d-flex flex-column bd-highlight p-2">
                    <div>
                      <b>Id : </b>
                      <span>{controlador.id}</span>
                    </div>
                    <div>
                      <b>Nome do equipamento : </b>
                      <span>{controlador.descricao}</span>
                    </div>
                    <div>
                      <b>Numero de Série : </b>
                      <span>{controlador.numeroSerie}</span>
                    </div>
                    <div>
                      <b>Senha do equipamento : </b>
                      <span>{controlador.senha}</span>
                    </div>
                    <div>
                      <b>Versão do software : </b>
                      <span>{controlador.versaoSoft}</span>
                    </div>
                    <div>
                      <b>Situação : </b>
                      {controlador.situacao === "B" ? (
                        <span className="text-danger">Bloqueado.</span>
                      ) : (
                        <span>Liberado</span>
                      )}
                    </div>
                    <div>
                      <b>Data ultimo acesso : </b>
                      <span>{formatarData(controlador.dataAcesso)}</span>
                    </div>
                    <div>
                      <b>Data cadastro : </b>
                      <span>{formatarData(controlador.dataCadastro)}</span>
                    </div>
                  </div>
                }
              />

              <Table hover striped responsive size="sm">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>N. Série</th>
                    <th>Situção</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.controladores.map((controlador, key) => {
                    return (
                      <tr key={key}>
                        <td style={{ maxWidth: "100px" }}>{controlador.descricao}</td>
                        <td>{controlador.numeroSerie}</td>
                        <td>
                          {controlador.situacao === "L" ? (
                            <FontAwesomeIcon icon="unlock-alt" color="#87CB16" style={{ fontSize: "22px" }} />
                          ) : (
                            <FontAwesomeIcon icon="lock" color="#dc3545" style={{ fontSize: "22px" }} />
                          )}
                        </td>
                        <td>
                          <button
                            className="btn-fill btn btn-success btn-xs mr-1"
                            onClick={() => this.visualizarControlador(controlador)}
                          >
                            Visualizar
                          </button>
                          <button
                            className="btn-fill btn btn-warning btn-xs mr-1"
                            onClick={() => this.editarControlador(controlador)}
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          }
        />
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
)(Controller);
