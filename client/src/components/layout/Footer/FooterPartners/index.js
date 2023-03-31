import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Poloniex from "assets/img/logos/poloniex.png";
import Bitbay from "assets/img/logos/bitbay.png";
import Binance from "assets/img/logos/binance.png";
import Bittrex from "assets/img/logos/bittrex.png";
import Kraken from "assets/img/logos/kraken.png";

import styles from "./index.module.sass";

const partners = [Poloniex, Bitbay, Binance, Bittrex, Kraken];

const PartnersNode = partners.map((partner, i) => (
  <Col key={i} className={styles.partner}>
    <a href="/">
      <img src={partner} alt="" />
    </a>
  </Col>
));

const FooterPartners = () => (
  <Container className={styles.partners}>
    <Row className="mzero">{PartnersNode}</Row>
  </Container>
);

export default FooterPartners;
