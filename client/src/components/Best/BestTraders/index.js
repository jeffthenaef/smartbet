import React from "react";
import { Col, Table } from "react-bootstrap";
import ArrowUp from "assets/img/best/greenarrow.png";
import Ball from "assets/img/best/ball.png";
import MenuSVG from "assets/img/best/menu";
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
    name: "Piotr",
    mark: "42",
    value: generateRandomValue(),
  },
  {
    name: "Rafał",
    mark: "34",
    value: generateRandomValue(),
  },
  {
    name: "Marcin",
    mark: "24",
    value: generateRandomValue(),
  },
  {
    name: "Marek",
    mark: "12",
    value: generateRandomValue(),
  },
  {
    name: "Łukasz",
    mark: "18",
    value: generateRandomValue(),
  },
  {
    name: "Piotr",
    mark: "42",
    value: generateRandomValue(),
  },
  // {
  //   name: "Rafał",
  //   mark: "34",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Marcin",
  //   mark: "24",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Marek",
  //   mark: "12",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Łukasz",
  //   mark: "18",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Piotr",
  //   mark: "42",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Rafał",
  //   mark: "34",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Marcin",
  //   mark: "24",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Marek",
  //   mark: "12",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Łukasz",
  //   mark: "18",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Piotr",
  //   mark: "42",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Rafał",
  //   mark: "34",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Marcin",
  //   mark: "24",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Marek",
  //   mark: "12",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Łukasz",
  //   mark: "18",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Piotr",
  //   mark: "42",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Rafał",
  //   mark: "34",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Marcin",
  //   mark: "24",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Marek",
  //   mark: "12",
  //   value: generateRandomValue(),
  // },
  // {
  //   name: "Łukasz",
  //   mark: "18",
  //   value: generateRandomValue(),
  // },
];

const BestTokens = () => {
  return (
    <>
      <h2>
        <MenuSVG />
        Best <b>Traders</b>
      </h2>
      <Table className={stylesTable.table} striped responsive="md">
        <tbody>
          {placeholder.map((el, i) => (
            <tr key={i}>
              <td style={{ textAlign: "left" }}>{el.name}</td>
              <td>
                <img src={Ball} alt="up" style={{ marginRight: "8px" }} />
                {el.mark}
              </td>
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
