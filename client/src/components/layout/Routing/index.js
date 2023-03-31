import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

import { Sidebar } from "components/layout";

import {
  HomePage,
  BlockchainTokenPage,
  SportsPage,
  LastResultsPage,
  BonusPage,
  ContactPage,
  ProfilePage,
  StockPage,
  PairsPage,
} from "pages";

import { routesURL } from "shared/routes";

const Routing = () => (
  <Container fluid>
    <Row>
      <Switch>
        <Route exact path={routesURL.home} component={HomePage} />
        <Route
          path={routesURL.blockchainToken}
          component={BlockchainTokenPage}
        />
        <Route path={`${routesURL.sports}/:category`} component={SportsPage} />
        <Route path={routesURL.lastResults} component={LastResultsPage} />
        <Route path={routesURL.bonus} component={BonusPage} />
        <Route path={routesURL.contact} component={ContactPage} />
        <Route path={`${routesURL.profile}/:address`} component={ProfilePage} />
        <Route path={`${routesURL.stock}/:address`} component={StockPage} />
        <Route path={routesURL.pairs} component={PairsPage} />
      </Switch>
      <Switch>
        <Route path={routesURL.bonus} component={null} />
        <Route path={routesURL.profile} component={null} />
        <Route path={routesURL.sports} component={null} />
        <Route path={routesURL.contact} component={null} />
        <Route path={routesURL.home} component={Sidebar} />
      </Switch>
    </Row>
  </Container>
);

export default Routing;
