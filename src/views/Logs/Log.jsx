import React, { Component } from "react";
import { Table } from "react-bootstrap";
import Modal from "../../components/Modal/Modal";
import { Card } from "../../components/Card/Card.jsx";
import { formatarData } from "../../util/funcoes";
import api from "../../services/api";

export default class Log extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: [],
      qtdRegistros: 0,
      modalShow: false,
      logSelecionado: {}
    };
  }

  componentDidMount() {
    this.getLogs();
    const scrollLogs = document.getElementById("scroll-logs-list");
    scrollLogs.addEventListener("scroll", this.trackScrolling);
  }

  trackScrolling = () => {
    const scrollLogs = document.getElementById("scroll-logs-list");
    if (scrollLogs.scrollHeight - scrollLogs.scrollTop <= scrollLogs.clientHeight + 15) {
      let lastId = this.state.logs[this.state.logs.length - 1];
      this.getLogs(lastId.id);
      document.removeEventListener("scroll", this.trackScrolling);
    }
  };

  getLogs = async id => {
    let logs = await api.get("/log", {
      params: {
        id: id
      }
    });
    let newLogs = this.state.logs;
    newLogs.push(...logs.data.logs);
    newLogs.qtdRegistros = logs.data.qtdRegistros;
    this.setState({ ...newLogs });
  };

  render() {
    let modalClose = () => this.setState({ modalShow: false });
    let log = this.state.logSelecionado;
    return (
      <div className="content">
        <Modal
          props={{
            show: this.state.modalShow,
            onHide: modalClose
          }}
          title="Detalhes do erro"
          content={
            <div className="p-2">
              <b>Id : </b>
              <span>{log.id}</span>
              <b className="pl-3">Tipo : </b>
              <span>{log.tipo}</span>
              <b className="pl-3 pb-2">Data : </b> <span>{formatarData(log.data)}</span>
              <hr />
              <p>
                <b>Descrição : </b> <span>{log.descricao}</span>
              </p>
              <p>
                <b>Erro : </b> <span className="text-secondary">{log.erro}</span>
              </p>
            </div>
          }
        />
        <Card
          title="Logs do Sistema"
          icon={{
            icon: "file-signature",
            color: "#8e44ad",
            fontSize: "25px"
          }}
          bsClass="m-0 p-0"
          content={
            <div>
              <div className="p-2">
                {this.state.logs.qtdRegistros
                  ? `Exibindo ${this.state.logs.length} de ${this.state.logs.qtdRegistros} Registros`
                  : ""}
              </div>
              <hr className="m-0 mb-1" />
              <div className="conteudo-logs" id="scroll-logs-list">
                <Table hover striped size="sm">
                  <thead>
                    <tr>
                      <th className="d-none d-sm-block">ID</th>
                      <th>Descrição</th>
                      <th>Tipo</th>
                      <th className="d-none d-sm-block">Data</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.logs.map((log, index) => {
                      return (
                        <tr key={index}>
                          <td className="d-none d-sm-block">{log.id}</td>
                          <td>{log.descricao}</td>
                          <td>{log.tipo}</td>
                          <td className="d-none d-sm-block">{formatarData(log.data)}</td>
                          <td>
                            <button
                              onClick={() => this.setState({ modalShow: true, logSelecionado: log })}
                              disabled={log.erro.length ? false : true}
                              className="btn-fill btn btn-success btn-xs"
                            >
                              Visualizar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          }
        />
      </div>
    );
  }
}
