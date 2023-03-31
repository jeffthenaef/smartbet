import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useSelector, connect } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { tokensToNumber } from "shared/helpers";

import BuyForm from "./common/buyForm";
import SellForm from "./common/sellForm";

import styles from "./styles/index.module.sass";

import contracts from "shared/contracts/contractsTree";

import { createBuyOrder, createSellOrder } from "../logic";

function randomEth() {
  return Math.floor(Math.random() * 5 + 1) / 1e2;
}

function randomTokens() {
  return Math.floor(Math.random() * 20 + 1);
}

function getFirstTokenForFootball(contracts) {
  const { events } = contracts;
  return Object.keys(events).reduce((final, key) => {
    if (events[key].category === "football") {
      const teams = Object.keys(events[key].teams);
      const [firstTeam] = teams;
      console.log("name", events[key].teams[firstTeam]);
      return firstTeam;
    }
    return final;
  }, "");
}

const arr = [{ id: "limit", name: "Limit" }];

const AskForm = ({ balance, wallet }) => {
  const { push } = useHistory();
  const { address } = useParams();

  const [checked, setChecked] = useState("limit");

  const userAddress = useSelector(({ user }) => user.wallet.address);
  const testToken = useMemo(() => getFirstTokenForFootball(contracts), []);
  const teamBalance = useMemo(() => balance.teams[address], [
    address,
    balance.teams,
  ]);

  const handleChange = (e) => setChecked(e.target.name);

  if (!address) {
    return <Redirect to={"/pairs"} />;
  }

  if (!teamBalance || !wallet) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.ordersWrapper}>
          <BuyForm
            askType={checked}
            data={{ balance: Number(wallet.ethBalance), price: 0.01 }}
            priceCurrency={"ETH"}
            currency={teamBalance.symbol}
            onSubmit={(state) => {
              createBuyOrder(testToken, state.amount, state.price, userAddress);
              console.log(state);
            }}
          />
          <SellForm
            currency={"ETH"}
            priceCurrency={teamBalance.symbol}
            askType={checked}
            data={{ balance: tokensToNumber(teamBalance.balance), price: 0.01 }}
            onSubmit={(state) => {
              createSellOrder(
                testToken,
                state.amount,
                state.price,
                userAddress
              );
              console.log(state);
            }}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ user }) => ({
  balance: user.balance,
  wallet: user.wallet,
});

export default connect(mapStateToProps)(AskForm);
