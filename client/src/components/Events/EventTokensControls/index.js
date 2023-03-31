import React, { useState, memo, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import ActualEventSingleton from "services/ActualEventSingleton";

import styles from "./index.module.sass";

import { SuccessButton, Button, TitleWithIcon } from "components/common";

import { BuyEventTokensModal } from "..";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const EventTokensControls = ({ selectedEvent, user, imBusy, classes }) => {
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [refundModalOpen, setRefundModalOpen] = useState(false);

  if (imBusy.events && isEmptyObject(selectedEvent)) {
    return null;
  }

  return (
    <>
      <BuyEventTokensModal
        {...{
          modalOpen: buyModalOpen,
          setModalOpen: setBuyModalOpen,
          selectedEvent,
        }}
      />
      <Button
        className={classes}
        variant="success"
        size="sm"
        onClick={() => setBuyModalOpen(true)}
      >
        Buy {selectedEvent.symbol} Tokens
      </Button>
    </>
  );
};

// {modalOpen && (
//   <EventModal
//     {...{
//       event,
//       address,
//       modalOpen,
//       setModalOpen,
//     }}
//   />
// )}

const mapStateToProps = ({ events, user }) => ({
  selectedEvent: events.selectedEvent,
  imBusy: events.imBusy,
  user,
});

export default connect(mapStateToProps)(memo(EventTokensControls));
