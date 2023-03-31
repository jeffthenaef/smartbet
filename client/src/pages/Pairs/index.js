import React, { useState, useCallback, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button as BSButton,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { EventsSelector, EventTokensControls } from "components/Events";
import { CategoriesList } from "components/Categories";

import styles from "./index.module.sass";
import stylesTable from "../../components/Teams/TeamsTable/index.module.sass";

function preprocessTeams(teams) {
  return teams.map((el) => {
    return {
      ...el,
      price: `${Math.floor(Math.random() * 1000) / 1000}ETH`,
      volume: `${Math.floor(Math.random() * 1e6)}`,
      pair: `${el.symbol}-ETH`,
    };
  });
}

function LinkToStock({ symbol, pair, address, disabled }) {
  let classes, toUrl;
  disabled ? (toUrl = "/pairs/") : (toUrl = `/stock/${address}`);
  disabled ? (classes = styles.disabledLink) : (classes = styles.link);

  return (
    <Link className={classes} to={toUrl}>
      Trade {pair}
    </Link>
  );
}

const Stock = ({ teams, imBusy, user }) => {
  return (
    <Container>
      <Row sm="12">
        <CategoriesList />
      </Row>

      <Row>
        <Col md="3" className="p-2">
          <EventsSelector />
        </Col>

        <Col className="p-2">
          <Table hover size="sm" variant="dark" className={stylesTable.table}>
            <thead>
              <tr>
                <th>Team</th>
                <th>Pair</th>
                <th>Market price</th>
                <th>Volume</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {preprocessTeams(teams).map(
                ({ id, pair, name, price, volume, symbol, address }) => (
                  <tr key={pair}>
                    <th>{name}</th>
                    <td>{pair}</td>
                    <td>{price}</td>
                    <td>{volume}</td>
                    <td>
                      <LinkToStock
                        symbol={symbol}
                        pair={pair}
                        address={address}
                        // disabled={symbol !== "RUS19"}
                      ></LinkToStock>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = ({ events, user }) => ({
  imBusy: events.imBusy,
  teams: events.teams,
  user,
});

export default connect(mapStateToProps)(Stock);
