import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

import {
  AskForm,
  Chart,
  OrderBook,
  OrdersList,
  RadioSelect,
} from "components/Stock";

import { mainAppEmitter } from "shared/helpers";

const arr = [
  {
    id: "wykres",
    name: "Wykres",
  },
  {
    id: "zlecenia",
    name: "Księga zleceń",
  },
];

const throttle = (func, delay) => {
  let inProgress = false;

  return (...args) => {
    if (inProgress) {
      return;
    }

    inProgress = true;
    setTimeout(() => {
      func(...args);
      inProgress = false;
    }, delay);
  };
};

const Stock = () => {
  const [checked, setChecked] = useState("wykres");

  const handleChange = (e) => setChecked(e.target.name);

  const [windowWidth, setWindowWidth] = useState(0);
  const handleResize = () => throttle(setWindowWidth(window.innerWidth), 10);

  useEffect(() => {
    const { innerWidth } = window;
    if (innerWidth !== windowWidth) {
      setWindowWidth(innerWidth);
    }
  }, [windowWidth]);

  useEffect(() => {
    mainAppEmitter.emitter.on("user-changed", (payload) => {
      console.log("on user changed", payload);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => handleResize());
    window.addEventListener("orientationchange", () => handleResize());

    return () => {
      window.removeEventListener("resize", () => handleResize());
      window.removeEventListener("orientationchange", () => handleResize());
    };
  }, []);

  return (
    <>
      {windowWidth >= 1024 ? (
        <Container style={{ backgroundColor: "#171717" }} className="p-0">
          <Row className="p-0 m-0">
            <Col sm={8} className="p-0 m-0">
              <Row className="p-0 m-0">
                <Col
                  className="p-0 m-0 border border-dark"
                  style={{ height: "350px" }}
                >
                  <Chart />
                </Col>
              </Row>
              <Row className="p-0 m-0">
                <Col className="px-1 py-1 pb-3 m-0 border border-dark">
                  <AskForm />
                </Col>
              </Row>
            </Col>

            <Col className="p-0 m-0 border border-dark">
              <OrderBook />
            </Col>
          </Row>
          <Row className="p-0 m-0 border border-dark">
            <OrdersList />
          </Row>
        </Container>
      ) : (
        <Container
          className="border border-dark p-0"
          style={{ backgroundColor: "#171717" }}
        >
          <Col className="spx-3 p-0 m-0">
            <RadioSelect
              arr={arr}
              checked={checked}
              handleChange={handleChange}
            />
          </Col>

          <Col className="p-3 m-0 " style={{ height: "400px" }}>
            {checked === "wykres" && <Chart />}
            {checked === "zlecenia" && <OrderBook />}
          </Col>

          <Col
            className="px-1 py-1 pb-3 border border-dark"
            style={{ backgroundColor: "#171717" }}
          >
            <AskForm />
          </Col>
          <Col
            className="border border-dark"
            style={{ backgroundColor: "#171717" }}
          >
            <OrdersList />
          </Col>
        </Container>
      )}
    </>
  );
};

export default Stock;
