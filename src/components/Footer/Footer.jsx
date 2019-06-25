import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => (
  <footer className="footer">
    <Container fluid>
      <p className="copyright pull-right">
        &copy; {new Date().getFullYear()} <span>Technow Sistemas Embarcados </span> | Desenvolvido por: 
        <strong> Jonas Vargaski</strong>
      </p>
    </Container>
  </footer>
);

export default Footer;
