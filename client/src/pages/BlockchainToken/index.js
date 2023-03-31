import React, { useEffect } from "react";
import { useRouteMatch, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import classnames from "classnames";
import styles from "./index.module.sass";

import ChipIcon from "assets/icons/about/chip.png";
import EthereumIcon from "assets/icons/about/ethereum.png";
import MetamaskIcon from "assets/icons/about/metamask.png";
import RunningIcon from "assets/icons/about/running.png";
import TrophyIcon from "assets/icons/about/trophy.png";

import BlockChainOne from "assets/img/blockchain/bc1.jpg";
import BlockChainTwo from "assets/img/blockchain/bc2.jpg";

const BlockchainToken = () => {
  let { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      let element = document.querySelector(hash);
      element.scrollIntoView(true);
      window.scrollBy(0, -74);
    }
  });

  return (
    <Row className="m-4 justify-content-center my-auto">
      <Col className="justify-content-md-center" lg="10">
        <h2>About SCT BET</h2>
        <p>
          SCTBET is marketplace for betting tokens where you can trade tokens of
          teams and players in current tournaments.
        </p>
      </Col>
      <Col className="justify-content-md-center" lg="10">
        <iframe
          className={styles.iframe}
          width="1920"
          height="450"
          src="https://www.youtube.com/embed/qOVAbKKSH10"
          title="Blockchain Technology Explained"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Col>
      <Col className="justify mb-5" lg="10">
        <h2 id="howToPlay" className="mb-4">
          How to play?
        </h2>
        <Row>
          <Col className={styles.iconContainer} lg="4">
            <img src={EthereumIcon} alt="Ethereum Icon" />
            <p>1. Get some ethereum</p>
          </Col>
          <Col className={styles.iconContainer} lg="4">
            <img src={MetamaskIcon} alt="Metamask Icon" />
            <p>2. Download and setup metamask - your wallet</p>
          </Col>
          <Col className={styles.iconContainer} lg="4">
            <img src={RunningIcon} alt="Running Icon" />
            <p>3. Choose discipline</p>
          </Col>
          <Col className={styles.iconContainer} lg="4">
            <img src={ChipIcon} alt="Chip Icon" />
            <p>4. Buy event token for tournament you want to play</p>
          </Col>
          <Col className={styles.iconContainer} lg="4">
            <img src={TrophyIcon} alt="Trophy Icon" />
            <p>5. Buy token for the team you believe in order book</p>
          </Col>
        </Row>
      </Col>
      <Col className="justify-content-md-center" lg="10">
        <h2 id="whyBlockchain">Why Blockchain?</h2>
        <div className={classnames("mb-5", styles.textImage)}>
          <Row>
            <Col md="12" lg="4">
              <img
                className={classnames("img-fluid", styles.image)}
                src={BlockChainOne}
                alt=""
              />
            </Col>
            <Col md="12" lg="8">
              <p>
                You will have a chance to be a kind of “shareholder” of team or
                a player you believe in to make progress, when you change your
                mind, you can sell it, and trade for another one.
              </p>
            </Col>
          </Row>
        </div>
        <div className={styles.textImage}>
          <Row>
            <Col md="12" lg="8">
              <p>
                Current platforms are big companies with plenty of people
                managing algorithms and observing sports events. Blockchain can
                make it simpler and cheaper, we won’t need many people to manage
                prices, profits, but we can make it using smart contract, and it
                will be more efficient and more transparent.
              </p>
            </Col>
            <Col md="12" lg="4">
              <img
                className={classnames("img-fluid", styles.image, styles.right)}
                src={BlockChainTwo}
                alt=""
              />
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default BlockchainToken;
