import React, { useState, useCallback, memo, useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import { Col, Row, ListGroup, Button, Form } from "react-bootstrap";

import styles from "./index.module.sass";

import { CategoryBanner } from "components/Categories";

import { handleChangeEvent } from "../logic";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const EventsSelector = ({
  selectedCategoryEvents,
  selectedEvent,
  withBanner,
  user,
  imBusy,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // if (imBusy && !isEmptyObject(user.balance.events)) {
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

  if (imBusy.events) {
    return <div>loading events</div>;
  }

  const fakeListData = [
    { name: "EURO 2020" },
    { name: "EURO 2019" },
    { name: "EURO 2018" },
  ];

  return (
    <React.Fragment>
      <Col md="12" className={styles.nav}>
        <Row>
          <Col className={styles.column}>
            Take a look on upcomming events
            <ListGroup className={styles.itemsGroup}>
              {selectedCategoryEvents.map(({ name, address }, index) => (
                <ListGroup.Item
                  as="div"
                  key={name + index.toString()}
                  className={styles.oneItem}
                  variant="dark"
                >
                  <span className={styles.spanName}>{name}</span>
                  <Button
                    as="div"
                    variant="warning"
                    className={styles.buttonSelect}
                    onClick={(e) => console.log("CLICKED")}
                  >
                    Select
                  </Button>
                </ListGroup.Item>
              ))}
              {fakeListData.map(({ name }) => (
                <ListGroup.Item
                  as="div"
                  key={name}
                  className={styles.oneItem}
                  variant="dark"
                >
                  <span className={styles.spanName}>{name}</span>
                  <Button
                    as="button"
                    variant="warning"
                    className={styles.buttonSelect}
                    disabled
                  >
                    Select
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Col>
    </React.Fragment>
  );

  // return (
  //   <React.Fragment>
  //     <Col md="12" className={styles.nav}>
  //       {/* {withBanner
  //         ? <CategoryBanner category={currentCategory} />
  //         : null} */}
  //       <Row>
  //         <Col>
  //           <Form.Group className={styles.inputContainer}>
  //             <Form.Label>Take a look on upcomming events</Form.Label>
  //             <Form.Control
  //               as="select"
  //               custom
  //               value={selectedEvent.address}
  //               onChange={(e) => {
  //                 console.log(e.target.value);
  //                 changeEvent(e);
  //               }}
  //             >
  //               {selectedCategoryEvents.map(({ name, address }, index) => (
  //                 <option key={name + index.toString()} value={address}>
  //                   {name}
  //                 </option>
  //               ))}
  //             </Form.Control>
  //           </Form.Group>
  //         </Col>
  //       </Row>
  //     </Col>
  //   </React.Fragment>
  // );
};

const mapStateToProps = ({ events, user }) => ({
  selectedCategoryEvents: events.selectedCategoryEvents,
  selectedEvent: events.selectedEvent,
  imBusy: events.imBusy,
  user,
});

export default connect(mapStateToProps)(EventsSelector);
