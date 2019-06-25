import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../store/actions";
import api from "../../services/api";
import { Card } from "../../components/Card/Card.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import { toast } from "react-toastify";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.usuario = { ...props.usuario, senha: "" };

    this.handleValue = this.handleValue.bind(this);
    this.atualizarUsuario = this.atualizarUsuario.bind(this);
  }

  handleValue(e) {
    this.usuario[e.target.name] = e.target.value;
  }

  async atualizarUsuario(e) {
    e.preventDefault();
    try {
      await api.put(`/usuario/${this.props.usuario.id}`, this.usuario);
      toast.success("Atualizado com Sucesso! Efetue o login novamente...", {
        position: "top-center"
      });
      setTimeout(() => {
        this.props.logout();
      }, 3000);
    } catch (error) {}
  }

  render() {
    return (
      <div className="content">
        <Card
          title="Perfil do usuário"
          content={
            <form>
              {/* <Panel bsStyle="warning">
                <Panel.Heading>
                  <Panel.Title componentClass="h3">Contato</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  <FormInputs
                    ncols={["col-md-5", "col-md-3", "col-md-4"]}
                    proprieties={[
                      {
                        label: "Nome Completo",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Ex.: João Souza",
                        defaultValue: this.usuario.nome,
                        onChange: this.handleValue,
                        name: "nome"
                      },
                      {
                        label: "Telefone",
                        type: "number",
                        bsClass: "form-control",
                        placeholder: "Ex.: 999871254",
                        defaultValue: this.usuario.telefone,
                        onChange: this.handleValue,
                        name: "telefone"
                      },
                      {
                        label: "Endereço",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Ex.: Estrada Geral Barracão",
                        defaultValue: this.usuario.endereco,
                        onChange: this.handleValue,
                        name: "endereco"
                      }
                    ]}
                  />
                </Panel.Body>
              </Panel>

              <Panel bsStyle="info">
                <Panel.Heading>
                  <Panel.Title componentClass="h3">Dados de Acesso</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  <FormInputs
                    ncols={["col-md-6", "col-md-6"]}
                    proprieties={[
                      {
                        label: "Email",
                        type: "email",
                        disabled: true,
                        bsClass: "form-control",
                        placeholder: "Ex.: joao@gmail.com",
                        defaultValue: this.usuario.email,
                        name: "email"
                      },
                      {
                        label: "Nova Senha",
                        type: "text",
                        bsClass: "form-control",
                        defaultValue: this.usuario.senha,
                        onChange: this.handleValue,
                        name: "senha"
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-3", "col-md-3"]}
                    proprieties={[
                      {
                        label: "Data Cadastro",
                        type: "text",
                        disabled: true,
                        bsClass: "form-control",
                        defaultValue: formatarData(this.usuario.dataCadastro)
                      },
                      {
                        label: "Data Modificação",
                        type: "text",
                        bsClass: "form-control",
                        disabled: true,
                        defaultValue: formatarData(this.usuario.dataModificacao)
                      }
                    ]}
                  />
                </Panel.Body>
              </Panel> */}
              <Button bsStyle="success" type="submit" pullRight fill onClick={this.atualizarUsuario}>
                Atualizar Perfil
              </Button>
              <div className="clearfix" />
            </form>
          }
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  usuario: state.usuario
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
