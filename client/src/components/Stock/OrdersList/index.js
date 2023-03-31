import React, { useState, useMemo } from "react";
import { Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import RadioSelect from "../common/radioSelect";

import stylesTable from "../../Teams/TeamsTable/index.module.sass";
import stylesButtons from "../OrderBook/styles/index.module.sass";

const arr = [
  {
    id: "open-order",
    name: "Your Orders",
  },
  // {
  //   id: 'trigger-order',
  //   name: 'Trigger Order',
  // },
  // {
  //   id: 'history',
  //   name: 'Open History',
  // },
];
function addressCover(address) {
  return `${address.slice(0, 3)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
}
const items = [
  { id: 1, test: "1111" },
  { id: 2, test: "2222" },
];

const SingleSell = (order) => {
  const { nonce, take, give, creator } = order;
  return useMemo(
    () => (
      <tr>
        <td>BID</td>
        <td>{take}</td>
        <td>{give}</td>
        <td>
          <Button
            size="sm"
            variant="danger"
            className={stylesButtons.buttonSell}
            onClick={() => {
              alert("TODO");
            }}
          >
            Cancel
          </Button>
        </td>
      </tr>
    ),
    [nonce]
  );
};

const SingleBuy = (order) => {
  const { nonce, take, give, onClick, creator } = order;
  return useMemo(
    () => (
      <tr>
        <td>ASK</td>
        <td>{give}</td>
        <td>{take}</td>
        <td>
          <Button
            size="sm"
            variant="danger"
            className={stylesButtons.buttonSell}
            onClick={() => {
              alert("TODO");
            }}
          >
            Cancel
          </Button>
        </td>
      </tr>
    ),
    [nonce]
  );
};

const OrderList = ({ sells, buys, wallet }) => {
  const [checked, setChecked] = useState("open-order");
  const { address } = wallet;

  const handleChange = (e) => setChecked(e.target.name);

  return (
    <>
      <RadioSelect arr={arr} checked={checked} handleChange={handleChange} />
      <Table
        bordered
        hover
        size="sm"
        variant="dark"
        className={stylesTable.table}
      >
        <thead>
          <tr>
            <th>type</th>
            <th>ETH vol</th>
            <th>TOKEN vol</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {sells
            .filter(({ creator }) => address === creator)
            .map((el) => (
              <SingleSell key={el.nonce} {...el} />
            ))}
          {buys
            .filter(({ creator }) => address === creator)
            .map((el) => (
              <SingleBuy key={el.nonce} {...el} />
            ))}
        </tbody>
      </Table>
    </>
  );
};

const mapStateToProps = ({ user, orders }) => ({
  wallet: user.wallet,
  ...orders,
});

export default connect(mapStateToProps)(OrderList);
