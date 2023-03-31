import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import styles from "./index.module.sass";

import { WarningButton, DisabledButton } from "components/common";
import { CategoriesList } from "components/Categories";
import {
  EventsSelector,
  EventTokensControls,
  EventsBox,
} from "components/Events";
import { TeamsTable } from "components/Teams";
import { BestTokens, BestTraders } from "components/Best";

import { routesURL } from "shared/routes";

const Home = () => (
  <>
    <Col xl="2">
      <BestTokens />
    </Col>
    <Col xl="8">
      <Row className="mzero">
        <Col md="6" className={styles.marginBottom}>
          <div className={styles.boxThree}>
            <div className={styles.boxContent}>
              <h2 className={styles.title}>Bahrain GP</h2>
              <h3>22 MARCH</h3>
              <Link to={`#`} className={styles.link} disabled>
                <DisabledButton className={styles.button} size="sm">
                  Coming soon
                </DisabledButton>
              </Link>
            </div>
          </div>
        </Col>
        <Col md="6" className={styles.marginBottom}>
          <div className={styles.boxFour}>
            <div className={styles.boxContent}>
              <h2 className={styles.title}>FORMULA 1</h2>
              <h3>2020</h3>
              <Link to={`#`} className={styles.link} disabled>
                <DisabledButton className={styles.button} size="sm">
                  Coming soon
                </DisabledButton>
              </Link>
            </div>
          </div>
        </Col>
        <Col md="6" className={styles.marginBottom}>
          <div className={styles.boxSix}>
            <div className={styles.boxContent}>
              <h2 className={styles.title}>Wimbledon</h2>
              <h3>29 JUNE</h3>
              <Link to={`#`} className={styles.link} disabled>
                <DisabledButton className={styles.button} size="sm">
                  Coming soon
                </DisabledButton>
              </Link>
            </div>
          </div>
        </Col>
        <Col md="6" className={styles.marginBottom}>
          <div className={styles.boxSeven}>
            <div className={styles.boxContent}>
              <h2 className={styles.title}>ESPORT</h2>
              <h3>22 AUGUST</h3>
              <Link to={`#`} className={styles.link} disabled>
                <DisabledButton className={styles.button} size="sm">
                  Coming soon
                </DisabledButton>
              </Link>
            </div>
          </div>
        </Col>

        <CategoriesList />
        <EventsBox />

        <TeamsTable />

        <Col md="12" className={styles.column}>
          <div className={styles.boxTwo}>
            <div className={styles.boxContent}>
              <h2 className={styles.title}>
                Get <b>YOUR BONUS</b>
              </h2>
              <div className={styles.inputContainer}>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <WarningButton className={styles.button} size="sm">
                  Receive your bonus!
                </WarningButton>
              </div>
            </div>
          </div>
        </Col>
        <Col md="6">
          <div className={styles.boxOne}>
            <div className={styles.boxContent}>
              <h2 className={styles.title}>
                What is <b>BLOCKCHAIN BET?</b>
              </h2>
              <Link
                to={`${routesURL.blockchainToken}#whyBlockchain`}
                className={styles.link}
              >
                <WarningButton className={styles.button} size="sm">
                  Read more
                </WarningButton>
              </Link>
            </div>
          </div>
        </Col>
        <Col md="6">
          <div className={styles.boxOne}>
            <div className={styles.boxContent}>
              <h2 className={styles.title}>
                How to <b>PLAY?</b>
              </h2>
              <Link
                to={`${routesURL.blockchainToken}#howToPlay`}
                className={styles.link}
              >
                <WarningButton className={styles.button} size="sm">
                  Read more
                </WarningButton>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Col>
    <Col xl="2">
      <BestTraders />
    </Col>
  </>
);

export default Home;
