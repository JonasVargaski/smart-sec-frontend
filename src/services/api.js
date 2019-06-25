import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../config/config";

const style = {
  container: {
    display: "flex",
    alignItems: "center"
  },
  icon: { fontSize: "26px", margin: "0px 15px 0px 3px" }
};

const success = res => {
  if ([200].includes(res.status) && res.data.info) {
    toast.success(
      <div style={style.container}>
        <FontAwesomeIcon icon="check" style={style.icon} />
        {res.data.info}
      </div>,
      {
        position: "top-right",
        autoClose: 2000
      }
    );
  }
  return Promise.resolve(res);
};

const error = err => {
  if (!err.response || [405, 500].includes(err.response.status)) {
    toast.error(
      <div style={style.container}>
        <FontAwesomeIcon icon="times" style={style.icon} />
        {err.response.data.info || "Erro no servidor"}
      </div>,
      {
        position: "top-right",
        autoClose: 4500
      }
    );
    return Promise.reject(err);
  }

  if (400 === err.response.status && err.response.data.info) {
    toast.warn(
      <div style={style.container}>
        <FontAwesomeIcon icon="exclamation" style={style.icon} />
        {err.response.data.info}
      </div>,
      {
        position: "top-right",
        autoClose: 4500
      }
    );
    return Promise.reject(err.response);
  }

  return Promise.reject(err);
};

const api = axios.create({
  baseURL: config.url
});

api.interceptors.response.use(success, error);
// api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

export default api;
