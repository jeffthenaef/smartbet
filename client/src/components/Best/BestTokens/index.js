import React from "react";
import { Col, Table } from "react-bootstrap";
import MenuSVG from "assets/img/best/menu";
import ArrowUp from "assets/img/best/greenarrow.png";
import stylesTable from "./index.module.sass";

const generateRandomValue = () => {
  const precision = 100;
  return (
    Math.floor(
      Math.random() * (10 * precision - 1 * precision) + 1 * precision
    ) /
    (1 * precision)
  );
};

const placeholder = [
  {
    name: "Juventus",
    mark: "CHL 94",
    value: generateRandomValue(),
  },
  {
    name: "Barcelona",
    mark: "CHL 94",
    value: generateRandomValue(),
  },
  {
    name: "Madrit",
    mark: "CHL 94",
    value: generateRandomValue(),
  },
  {
    name: "I. Mediolan",
    mark: "CHL 94",
    value: generateRandomValue(),
  },
  {
    name: "I. City",
    mark: "CHL 94",
    value: generateRandomValue(),
  },
  {
    name: "Juventus",
    mark: "CHL 94",
    value: generateRandomValue(),
  },
  // {
  //   name: "Barcelona",
  //   mark: "CHL 94",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Madrit",
  //   mark: "CHL 94",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "I. Mediolan",
  //   mark: "CHL 94",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "I. City",
  //   mark: "CHL 94",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Juventus",
  //   mark: "CHL 94",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Barcelona",
  //   mark: "CHL 94",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Madrit",
  //   mark: "CHL 94",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "I. Mediolan",
  //   mark: "CHL 94",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "I. City",
  //   mark: "CHL 94",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Juventus",
  //   mark: "CHL 94",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Barcelona",
  //   mark: "CHL 94",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Madrit",
  //   mark: "CHL 94",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "I. Mediolan",
  //   mark: "CHL 94",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "I. City",
  //   mark: "CHL 94",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Juventus",
  //   mark: "CHL 94",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Barcelona",
  //   mark: "CHL 94",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Madrit",
  //   mark: "CHL 94",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "I. Mediolan",
  //   mark: "CHL 94",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "I. City",
  //   mark: "CHL 94",
  //   value: generateRandomValue(),
  // },
];

const BestTokens = () => {
  return (
    <>
      <h2>
        <MenuSVG />
        Best <b>Tokens</b>
      </h2>
      <Table className={stylesTable.table} striped responsive="md">
        <tbody>
          {placeholder.map((el, i) => (
            <tr key={i}>
              <td style={{ textAlign: "left" }}>{el.name}</td>
              <td>{el.mark}</td>
              <td>
                <img src={ArrowUp} alt="up" style={{ marginRight: "8px" }} />
                {el.value}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default BestTokens;
