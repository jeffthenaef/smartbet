import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import styles from './index.module.sass';

import { WarningButton } from 'components/common';

const promotions = [1, 2, 3, 4, 5, 6];

const Bonus = () => (
  <Col md="12">
    <Row className="mzero">
      {promotions.map(promotion => (
        <Col key={promotion} md="4">
          <div className={styles.boxWhat}>
            <h2 className={styles.title}><span>PROMO {promotion}</span> BLOCKCHAIN BET</h2>
            <Link to="/blockchain-token"><WarningButton className={styles.button} size="sm">Get it now!</WarningButton></Link>
          </div>
        </Col>
      ))}
    </Row>
  </Col>
);

export default Bonus;
