import React, { useState, useCallback, useMemo } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

import styles from "../styles/index.module.sass";

function addressCover(address) {
  return `${address.slice(0, 3)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
}

const SingleBuy = (order) => {
  const { nonce, take, give, onClick, creator } = order;
  return useMemo(
    () => (
      <tr className={styles.first}>
        <td>{give}</td>
        <td>{take}</td>
        <td>
          <Button
            type="button"
            variant="success"
            size="sm"
            onClick={() => onClick(order)}
            className={styles.buttonBuy}
          >
            SELL
          </Button>
        </td>
      </tr>
    ),
    [nonce]
  );
};

const Buys = ({ buys, finalizeBuy, wallet }) => {
  const { address } = wallet;

  if (buys.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan="3">
            <span>zero buy orders</span>
          </td>
        </tr>
        {/* <tr>
          <td colSpan="3">
            <span>total ETH vol</span>
            <span>total tokens vol</span>
          </td>
        </tr> */}
      </tbody>
    );
  }

  return (
    <tbody>
      {buys
        .filter(({ creator }) => address !== creator)
        .map((el) => (
          <SingleBuy key={el.nonce} {...el} onClick={finalizeBuy} />
        ))}
      {/* <td colSpan="3">
        <span>total ETH vol</span>
        <span>total tokens vol</span>
      </td> */}
    </tbody>
  );
};

const mapStateToProps = ({ user }) => ({
  wallet: user.wallet,
});

export default connect(mapStateToProps)(Buys);
