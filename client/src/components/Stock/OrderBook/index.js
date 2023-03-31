import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { Table, Button, Tab } from "react-bootstrap";
import classnames from "classnames";

import Sells from "./sells";
import Buys from "./buys";

import { finalizeSell, finalizeBuy } from "./logic";

import styles from "./styles/index.module.sass";
import stylesTable from "../../Teams/TeamsTable/index.module.sass";
import { useParams } from "react-router";

const OrderBook = ({ wallet, imBusy, sells, buys, balance }) => {
  const { address } = useParams();
  const teamBalance = useMemo(() => balance.teams[address], [
    address,
    balance.teams,
  ]);

  if (imBusy || !teamBalance) {
    return <div>Loading</div>;
  }

  const sell = (order) => {
    finalizeSell(order, wallet.address);
  };

  const buy = (order) => {
    finalizeBuy(order, wallet.address);
  };

  return (
    <div className={classnames(styles.table_wrapper, "w-100 h-100")}>
      <Table
        hover
        size="sm"
        variant="dark"
        className={stylesTable.orderBookTable}
      >
        <thead>
          <tr>
            <th>Total ETH vol</th>
            <th>Total {teamBalance.symbol} vol</th>
            <th style={{ width: "100px" }} />
          </tr>
        </thead>

        <Sells sells={sells} finalizeSell={sell} />
      </Table>
      <Table
        hover
        size="sm"
        variant="dark"
        className={stylesTable.orderBookTable2}
      >
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <Buys buys={buys} finalizeBuy={buy} />
      </Table>
    </div>
  );

  // return (
  //   <div className={classnames(styles.table_wrapper, "w-100 h-100")}>
  //     <Table hover size="sm" variant="dark" className={stylesTable.table}>
  //       <thead>
  //         <tr>
  //           <th>Total ETH vol</th>
  //           <th>Total {teamBalance.symbol} vol</th>
  //           <th style={{ width: "100px" }} />
  //         </tr>
  //       </thead>

  //       <Sells sells={sells} finalizeSell={sell} />
  //       <Buys buys={buys} finalizeBuy={buy} />
  //     </Table>
  //   </div>
  // );
};

const mapStateToProps = ({ user, orders }) => ({
  wallet: user.wallet,
  balance: user.balance,
  ...orders,
});

export default connect(mapStateToProps)(OrderBook);
