import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
} from 'react-bootstrap'
import { BuyForm, AvailableTokens } from './BuyTeamTokensModal.parts'
import { tokensToNumber, toU256 } from 'shared/helpers';
import EventsHandler from 'services/handlers/EventsHandler'
import TeamsHandler from 'services/handlers/TeamsHandler'
import Contracts from 'services/AllContractsService'
import BlockchainService from 'services/BlockchainService'

import styles from './index.module.sass';

//   mogę kupić tylko tyle ile jest
//   mogę kupić tylko tyle za ile mam eth
// eventContract, user, team, preciseAmount
const BuyTeamTokensModal = ({ isModalOpen, setModalOpen, selectedEvent, user, team }) => {
  const handleBuyTeamToken = useCallback((amount) => {
    async function buy() {
      try {
        const contract = Contracts.getEventContract(selectedEvent.address)
        const teamContract = Contracts.getTeamContract(team.address)
        const preciseAmount = amount / team.ratio

        const haveSomeTokenOnAccount = await TeamsHandler._getBalance(teamContract, user.wallet.address)

        await EventsHandler.buyTeamToken(contract, user.wallet.address, team.address, preciseAmount)
        alert(`You bought ${amount} ${team.symbol} tokens`)

        setModalOpen(false);

        const firstBuy = Number(haveSomeTokenOnAccount) === 0
        if (firstBuy) {
          const data = await TeamsHandler.getTokenData(teamContract)
          await BlockchainService.addTokenToWallet(teamContract, data)
        }
      } catch (err) {
        alert(err.message)
        setModalOpen(false);
      }
    }
    buy()
  }, [team, selectedEvent, user])

  const closeModal = () => setModalOpen(false);

  if (!team) {
    return null
  }

  return (
    <Modal show={isModalOpen} onHide={closeModal} className={styles.modal}>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>Buy {team.symbol} Tokens
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <BuyForm selectedEvent={selectedEvent} user={user} onSubmit={handleBuyTeamToken} team={team} />
        <AvailableTokens balance={user.balance} selectedTeam={team} />
      </Modal.Body>
    </Modal>
  );
};


const mapStateToProps = ({
  events,
  user,
}) => ({
  selectedEvent: events.selectedEvent,
  user,
});

export default connect(mapStateToProps)(BuyTeamTokensModal);
