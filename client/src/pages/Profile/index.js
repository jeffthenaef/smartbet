import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Table,
} from 'react-bootstrap'

import classnames from 'classnames';
import styles from './index.module.sass';
import { EventsBalances, TeamsBalances } from 'components/Profile';

import { Events, getTeamsForEvent } from 'shared/contracts/contractsData';

const Profile = ({
  match: {
    params,
  },
}) => (
  <Col lg="12">
    <Row className="mzero">
      <Col lg="12">
        <h2>Profile </h2>
        <p>Address: {params.address}</p>
        <Row>
          <Col lg="6">
            <EventsBalances />
          </Col>
          <Col lg="6">
            <TeamsBalances />
          </Col>
        </Row>
      </Col>
    </Row>
  </Col>
);

export default Profile;
