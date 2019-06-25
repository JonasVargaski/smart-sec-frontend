import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

import Card from "../../components/Card/Card";
//import api from '../../services/api'

export default class TableList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      endDate: null
    };
  }

  getFase(fase) {
    switch (fase) {
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

  getClima(clima) {
    switch (clima) {
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
    return (
      <div className="content">
        <Card
          title="Histórico dos ultimos eventos"
          // category="Here is a subtitle for this table"
          // ctTableFullWidth
          ctTableResponsive
          content={
            <div>
              <Container>
                <Row>
                  <Col md={6} />
                </Row>
                <hr />
                <Row>
                  <Table striped hover bordered size="sm">
                    <thead>
                      <tr>
                        <th className="text-center">Data</th>
                        <th className="text-center">Temperatura</th>
                        <th className="text-center">Temp. Ajuste</th>
                        <th className="text-center">Umidade</th>
                        <th className="text-center">Umid. Ajuste</th>
                        <th className="text-center">Fase</th>
                        <th className="text-center">Clima</th>
                        <th className="text-center">Ventoinha</th>
                        <th className="text-center">Alarme</th>
                        <th className="text-center">Trava</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {
                        this.state.dados.map((value, key) => {
                          return (
                            <tr key={key}>
                              <th className='text-center'>{this.value.data}</th>
                              <th className='text-center'>{value.temperatura}</th>
                              <th className='text-center'>{value.temperatura_ajuste}</th>
                              <th className='text-center'>{value.umidade}</th>
                              <th className='text-center'>{value.umidade_ajuste}</th>
                              <th className='text-center'>{this.getFase(value.fase)}</th>
                              <th className='text-center'>{this.getClima(value.clima)}</th>
                              <th className='text-center'>{(value.sts_ventoinha) ? "Ligada" : "Desligada"}</th>
                              <th className='text-center'>{(value.sts_alarme) ? "Ligado" : "Desligado"}</th>
                              <th className='text-center'>{(value.sts_trava) ? "Travado" : "Destravado"}</th>

                            </tr>
                          )
                        })
                      } */}
                    </tbody>
                  </Table>
                </Row>
              </Container>
            </div>
          }
        />
      </div>
    );
  }
}
