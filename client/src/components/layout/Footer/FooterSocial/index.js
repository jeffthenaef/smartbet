import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import styles from "./index.module.sass";

const FooterSocial = () => (
  <Row className={styles.socials}>
    <Container>
      <a href="/">
        <span className="fa fa-youtube" />
      </a>
      <a href="https://twitter.com/sctbet" target="_blank">
        <span className="fa fa-twitter" />
      </a>
      <a href="https://www.facebook.com/sctbet" target="_blank">
        <span className="fa fa-facebook" />
      </a>
      <a href="https://www.instagram.com/sctbet/" target="_blank">
        <span className="fa fa-instagram" />
      </a>
      <a href="https://t.me/joinchat/q7wlVb-QqcRmNzE0" target="_blank">
        <span className="fa fa-telegram" />
      </a>
    </Container>
  </Row>
);

export default FooterSocial;
