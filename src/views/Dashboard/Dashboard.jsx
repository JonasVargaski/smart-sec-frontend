import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../store/actions";
import api from "../../services/api";
import { formatarData } from "../../util/funcoes";

import { Card } from "../../components/Card/Card.jsx";
import { StatsCard } from "../../components/StatsCard/StatsCard.jsx";
import Grafico from "../../components/Chart/Grafico";

import { socket } from "../../services/socket";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timerGetData: false
    };

    this.buscarDadosControlador = this.buscarDadosControlador.bind(this);
    this.buscarDadosControladorGrafico = this.buscarDadosControladorGrafico.bind(this);
    this.controladorSelecionado = {};
  }

  componentWillMount() {
    socket.emit("new-user", {
      sessao: socket.id,
      id: this.props.usuario.id,
      nome: this.props.usuario.nome,
      email: this.props.usuario.email
    });

    setTimeout(() => {
      socket.on(this.props.controladorSelecionado, data => console.log(data));
    }, 3000);

    this.buscarDadosControlador();
    this.setState({
      timerGetData: setInterval(() => {
        this.buscarDadosControlador();
      }, 7000)
    });
  }

  componentWillUnmount() {
    socket.emit("exit-user");
    socket.removeAllListeners();
    clearInterval(this.state.timerGetData);
  }

  componentWillUpdate() {
    if (this.props.controladorSelecionado !== this.controladorSelecionado) {
      this.controladorSelecionado = this.props.controladorSelecionado;
      this.buscarDadosControladorGrafico();
    }
  }

  buscarDadosControlador() {
    try {
      setTimeout(() => {
        if (this.props.controladorSelecionado) {
          api.get(`/controlador/${this.props.controladorSelecionado}`).then(dados => {
            this.props.setUltimoDado(dados.data[0]);
          });
        }
      }, 1000);
    } catch (error) {}
  }

  async buscarDadosControladorGrafico() {
    try {
      if (this.props.controladorSelecionado) {
        let dados = await api.get(`/controlador/grafico/${this.props.controladorSelecionado}`);
        let umid = [];
        let temp = [];
        umid = dados.data
          .map(dado => {
            return {
              data: formatarData(dado.data),
              Umidade: dado.umid,
              Ajuste: dado.umidAjst
            };
          })
          .reverse();
        temp = dados.data
          .map(dado => {
            return {
              data: formatarData(dado.data),
              Temperatura: dado.temp,
              Ajuste: dado.tempAjst
            };
          })
          .reverse();

        this.props.setDadosGrafico({ umid, temp });
      }
    } catch (error) {}
  }

  getFase(item) {
    switch (item) {
      case 1:
        return "Amarelação";
      case 2:
        return "Murchamento";
      case 3:
        return "Sec. Folha";
      case 4:
        return "Sec. Talo";
      default:
        return "- -";
    }
  }

  getClima(item) {
    switch (item) {
      case 1:
        return "Umido";
      case 2:
        return "Normal";
      case 3:
        return "Seco";
      default:
        return "- -";
    }
  }

  render() {
    const { ultimoDado, dadosGrafico } = this.props;
    return (
      <div className="content">
        <Container fluid>
          <Row>
            <Col lg={4} sm={6}>
              <StatsCard
                icon={{ icon: "thermometer-half", color: "#f83924" }}
                cards={true}
                text1="Temperatura"
                value1={`${ultimoDado.temp} ºF`}
                text2="Ajuste"
                value2={`${ultimoDado.tempAjst} ºF`}
                statsIconText={`Indicador de Temperatura`}
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                icon={{ icon: "cloud-sun-rain", color: "#9fdff7" }}
                cards={true}
                text1="Umidade"
                value1={`${ultimoDado.umid} ${ultimoDado.tipoSensor === 0 ? " ºF" : " %"}`}
                text2="Ajuste"
                value2={`${ultimoDado.umidAjst} ${ultimoDado.tipoSensor === 0 ? " ºF" : " %"}`}
                statsIconText={`Indicador de Umidade`}
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                icon={{ icon: "volume-up", color: "#ff9537" }}
                text1="Alarme"
                value1={`${ultimoDado.alarme === 1 ? "Ligado" : "Desligado"}`}
                statsIconText={`Indicador do Status de Alarme`}
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                icon={{ icon: "clock", color: "#8980c0" }}
                text1="Fase"
                value1={this.getFase(ultimoDado.fase)}
                statsIconText={`Indicador de Fase`}
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                icon={{ icon: "cloud", color: "#2596eb" }}
                text1="Clima"
                value1={this.getClima(ultimoDado.clima)}
                statsIconText={`Indicador de Clima`}
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                icon={{ icon: "fan", color: "#f8b900" }}
                text1="Ventoinha"
                value1={`${ultimoDado.ventoinha === 1 ? " Ligado" : "Desligado"}`}
                statsIconText={`Indicador do Status da Ventoinha`}
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                icon={{ icon: "unlock-alt", color: "#99cf6d" }}
                text1="Trava de fase"
                value1={`${ultimoDado.trava === 1 ? "Travado" : "Destravado"}`}
                statsIconText={`Indicador do Status da Trava de Fase`}
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                icon={{ icon: "plug", color: "#2b2b2b" }}
                text1="Energia"
                value1={`${ultimoDado.energia === 1 ? "Conectado" : "Desconectado"}`}
                statsIconText={`Indicador de Rede Elétrica`}
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                icon={{ icon: "wifi", color: "#2691ec" }}
                text1="Conexão wifi"
                value1={formatarData(ultimoDado.data)}
                statsIconText={`Indicador de ultima conexão`}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Card
                title="Gráfico Temperatura"
                content={
                  <Grafico data={dadosGrafico.temperatura} />
                  //  <Spinner></Spinner>
                }
              />
            </Col>
            <Col sm={12}>
              <Card title="Gráfico Umidadee" content={<Grafico data={dadosGrafico.umidade} />} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  usuario: state.usuario,
  controladorSelecionado: state.controladorSelecionado,
  ultimoDado: state.dadosControlador.ultimoDado,
  dadosGrafico: state.dadosControlador.dadosGrafico
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
