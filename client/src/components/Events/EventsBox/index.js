import React, { useState, useCallback, memo, useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import { Col, Row, ListGroup, Button, Form } from "react-bootstrap";

import styles from "./index.module.sass";

import { CategoryBanner } from "components/Categories";
import { EventTokensControls } from "../../../components/Events";

import { handleChangeEvent } from "../logic";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const EventsBox = ({
  selectedCategoryEvents,
  selectedEvent,
  withBanner,
  user,
  imBusy,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // if (imBusy && !isEmptyObject(user.balance.events)) {
    // console.log(user.balance);
    if (isEmptyObject(user.balance.events)) console.log("EMPTY");
    if (!isEmptyObject(user.balance.events)) {
      const [selectedEvent] = selectedCategoryEvents;

      if (selectedEvent) {
        handleChangeEvent(selectedEvent, user, dispatch);
      }
    }
  }, [imBusy.events, selectedCategoryEvents, user]);

  const changeEvent = useCallback(
    ({ target }) => {
      const [selectedEvent] = selectedCategoryEvents.filter(
        ({ address }) => target.value === address
      );
      handleChangeEvent(selectedEvent, dispatch);
    },
    [selectedCategoryEvents]
  );

  const scrollIntoElement = () => {
    const id = "teams-table-id";
    const yOffset = -100;
    const element = document.getElementById(id);
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  if (imBusy.events) {
    return <div>loading events</div>;
  }

  return (
    <React.Fragment>
      <Col md="12">
        <Row id="event-box-id">
          {selectedCategoryEvents.map(({ name, address }, index) => (
            <Col md="12" key={name + index.toString()}>
              <div className={styles.box}>
                <div className={styles.boxContent}>
                  <h2 className={styles.title}>
                    <b>{name}</b>
                  </h2>
                  <div className={styles.buttonsContainer}>
                    {/* <Button
                      variant="warning"
                      className={styles.button}
                      size="sm"
                    >
                      Buy tokens
                    </Button> */}
                    <EventTokensControls
                      classes={`${styles.button} ${styles.buttonBuy}`}
                    />
                    <Button
                      variant="warning"
                      className={styles.button}
                      size="sm"
                      onClick={() => scrollIntoElement()}
                    >
                      Check teams
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Col>
    </React.Fragment>
  );
};

const mapStateToProps = ({ events, user }) => ({
  selectedCategoryEvents: events.selectedCategoryEvents,
  selectedEvent: events.selectedEvent,
  imBusy: events.imBusy,
  user,
});

export default connect(mapStateToProps)(EventsBox);
