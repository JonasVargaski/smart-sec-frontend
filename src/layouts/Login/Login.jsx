import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../store/actions";

import logo from "../../assets/img/logo-transp.png";
import loader from "../../assets/svgs/loading.svg";
import Input from "../../components/FormInputs/Input";
import Button from "../../components/CustomButton/Button";
import Footer from "../../components/Footer/Footer";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import api from "../../services/api";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cad: false,
      loader: false
    };
    this.usuario = {
      email: "",
      senha: "",
      nome: "",
      endereco: "",
      telefone: ""
    };
    this.sigIn = this.sigIn.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.registry = this.registry.bind(this);
  }

  async sigIn(e) {
    e.preventDefault();
    const { email, senha } = this.usuario;
    let parseEmail = /^[a-z0-9.-_&]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (!parseEmail.test(email.trim()) || senha.length < 3) {
      toast.warn("E-mail ou senha inválidos!");
      return;
    }
    try {
      if (!this.state.loader) {
        this.setState({ loader: true });
        let res = await api.post("/auth", { email, senha });
        localStorage.setItem("token", res.data.token);
        api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        this.setState({ loader: false }, () => this.props.setUsuario(res.data));
      }
    } catch (error) {
      localStorage.removeItem("usuario");
      this.setState({ loader: false });
    }
  }

  handleInput(e) {
    this.usuario[e.target.name] = e.target.value;
  }

  async registry(e) {
    e.preventDefault();
    const usuario = this.usuario;
    if (
      usuario.email.length < 5 ||
      usuario.endereco.length < 3 ||
      usuario.nome.length < 3 ||
      usuario.senha.length < 3 ||
      usuario.telefone.length < 3
    ) {
      toast.warn("Preencha todos os campos!");
      return;
    }
    try {
      if (!this.state.loader) {
        this.setState({ loader: true });
        await api.post("/usuario", usuario);
        this.setState({ cad: false });
        this.setState({ loader: false });
        toast.success("Usuário Cadastrado com Sucesso!");
      }
    } catch (error) {}
    this.setState({ loader: false });
  }

  render() {
    const { autenticado } = this.props;
    if (autenticado) {
      return <Redirect to="/app/dashboard" />;
    }

    const SingUp = () => {
      return (
        <form>
          <Input
            proprieties={{
              type: "text",
              placeholder: "Nome Completo do Usúario",
              name: "nome",
              onChange: this.handleInput,
              required: true,
              style: { marginTop: "-45px" }
            }}
          />
          <Input
            proprieties={{
              type: "text",
              placeholder: "Endereço",
              name: "endereco",
              onChange: this.handleInput,
              required: true
            }}
          />
          <Input
            proprieties={{
              type: "number",
              placeholder: "Telefone de Contato",
              name: "telefone",
              onChange: this.handleInput,
              required: true
            }}
          />
          <Input
            proprieties={{
              type: "email",
              placeholder: "E-mail de Acesso",
              name: "email",
              onChange: this.handleInput,
              required: true
            }}
          />
          <Input
            proprieties={{
              type: "password",
              placeholder: "Senha de Acesso",
              name: "senha",
              onChange: this.handleInput,
              required: true
            }}
          />
          <Button
            proprieties={{ onClick: this.registry }}
            content={this.state.loader ? <img src={loader} alt="logo" className="img-logo" /> : "Cadastrar"}
          >
            {" "}
          </Button>
          <div
            className="j-botao-cad"
            onClick={e => {
              e.preventDefault();
              this.setState({ cad: false });
            }}
          >
            Voltar
          </div>
        </form>
      );
    };
    const Sign = () => {
      return (
        <form>
          <Input
            proprieties={{
              type: "email",
              placeholder: "E-mail de Acesso",
              name: "email",
              onChange: this.handleInput,
              required: true,
              defaultValue: this.usuario.email
            }}
          />
          <Input
            proprieties={{
              type: "password",
              placeholder: "Senha de Acesso",
              name: "senha",
              onChange: this.handleInput,
              required: true,
              defaultValue: this.usuario.senha
            }}
          />
          <Button
            proprieties={{ onClick: this.sigIn }}
            content={this.state.loader ? <img src={loader} alt="logo" className="img-logo" /> : "Acessar"}
          >
            {" "}
          </Button>
          <div className="form-input">
            <div
              className="j-botao-cad"
              onClick={e => {
                e.preventDefault();
                this.setState({ cad: true });
              }}
            >
              Cadastre-se!
            </div>
          </div>
        </form>
      );
    };

    return (
      <div className="j-bg-degrade">
        <section className="j-container-form">
          <div className="painel-logo">
            <img src={logo} alt="logo" className="img-logo" />
          </div>
          <div className="painel-form">
            <div className="form-header">
              <div className="form-title">
                Monitoramento <p>Central do Usuário</p>
              </div>
            </div>

            {this.state.cad ? <SingUp /> : <Sign />}
            <div />
            <div className="j-footer">
              <Footer />
            </div>
          </div>
        </section>
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
)(Login);
