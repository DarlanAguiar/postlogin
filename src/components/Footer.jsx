import React from "react";
import { GiFrozenArrow } from "react-icons/gi";

import "./Footer.css"

const Footer = () => {
  return (
    <footer className="rodape">
      <a href="https://www.facebook.com/darlan.aguiar.165">
        <p className="textoRodape">
          Dr.Gelo <GiFrozenArrow /> Software
        </p>
      </a>
    </footer>
  );
};

export default Footer;
