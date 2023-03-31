import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
} from 'react-bootstrap'
import { BuyForm, AvailableTokens } from './BuyEventTokensModal.parts'
import { tokensToNumber, toU256 } from 'shared/helpers';
import EventsHandler from 'services/handlers/EventsHandler'
import Contracts from 'services/AllContractsService'
import BlockchainService from 'services/BlockchainService'

import styles from './index.module.sass';

//   mogę kupić tylko tyle ile jest
//   mogę kupić tylko tyle za ile mam eth

const BuyEventTokensModal = ({ modalOpen, setModalOpen, selectedEvent, user }) => {
  const handleBuyEventToken = useCallback((amount) => {
    async function buy() {
      try {
        const contract = Contracts.getEventContract(selectedEvent.address)
        const preciseAmount = amount / selectedEvent.ratio

        const haveSomeTokenOnAccount = await EventsHandler._getBalance(contract, user.wallet.address)

        await EventsHandler.buyEventToken(contract, user.wallet.address, preciseAmount)
        alert(`You bought ${amount} ${selectedEvent.symbol} tokens`)

        setModalOpen(false);

        const firstBuy = Number(haveSomeTokenOnAccount) === 0
        if (firstBuy) {
          const data = await EventsHandler.getTokenData(contract)
          await BlockchainService.addTokenToWallet(contract, data)
        }
      } catch (err) {
        alert(err.message)
        setModalOpen(false);
      }
    }
    buy()
  }, [selectedEvent.address])


  const closeModal = () => setModalOpen(false);

  return (
    <Modal show={modalOpen} onHide={closeModal} className={styles.modal}>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>Buy {selectedEvent.name} Tokens
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <BuyForm selectedEvent={selectedEvent} user={user} onSubmit={handleBuyEventToken} />
        <AvailableTokens balance={user.balance} selectedEvent={selectedEvent} />
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

export default connect(mapStateToProps)(BuyEventTokensModal);
