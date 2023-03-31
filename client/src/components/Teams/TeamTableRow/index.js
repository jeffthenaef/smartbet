import React, { useState, useEffect, memo, useMemo, useCallback } from "react";

import styles from "./index.module.sass";

import { Button, ExternalLink } from "components/common";

import TeamModal from "../TeamModal";

function generateRandomPriceEth() {
  return `${Math.floor(Math.random() * 1000) / 1000}ETH`;
}

const TeamTableRow = ({ team, selectedEvent, onClick }) => {
  return (
    <tr>
      <td>
        <ExternalLink
          href={`https://rinkeby.etherscan.io/address/${team.address}`}
        >
          <b>{team.name}</b>
        </ExternalLink>
      </td>
      <td>{`1 ${selectedEvent.symbol} = ${team.ratio} ${team.symbol}`}</td>
      <td>{generateRandomPriceEth()}</td>
      <td>{generateRandomPriceEth()}</td>
      <td>
        <Button
          onClick={onClick}
          className={styles.buttonBuy}
          size="sm"
          variant="success"
        >
          Exchange
        </Button>
      </td>
    </tr>
  );
};

// {modalOpen && (
//   <TeamModal
//     {...{
//       modalOpen,
//       setModalOpen,
//       tokenData,
//       event,
//       address,
//     }}
//   />
// )}

export default TeamTableRow;
