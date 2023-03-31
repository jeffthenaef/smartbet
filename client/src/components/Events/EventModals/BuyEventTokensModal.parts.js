import React, { useState, useEffect, useCallback } from 'react';
import { tokensToNumber, toU256 } from 'shared/helpers';
import {
  Form,
} from 'react-bootstrap'
import { Button } from 'components/common';

const getMinMaxBasedOnEventAndUserAccount = ({ wallet }, { ratio }) => {
  const { weiBalance } = wallet
  const max = Math.floor(tokensToNumber(weiBalance * ratio))
  const min = 0
  return { max, min }
}

function getPriceInEth(amount, ratio) {
  return (amount / ratio)
}

const BuyForm = ({ user, selectedEvent, onSubmit }) => {
  const [scale, setScale] = useState({ min: 0, max: 10 });
  const [buyAmount, setBuyAmount] = useState('2');

  useEffect(() => {
    const scale = getMinMaxBasedOnEventAndUserAccount(user, selectedEvent)
    setScale(scale)
  }, [selectedEvent])

  const handleChangeAmount = useCallback((e) => {
    setBuyAmount(e.target.value)
  }, [])

  return (
    <Form>
      <Form.Group>
        <Form.Label>
          Select amount to buy
        </Form.Label>
        <Form.Control
          value={buyAmount}
          type="number"
          min="2"
          step="1"
          max={scale.max}
          placeholder="Ethereum to spend"
          onChange={handleChangeAmount}
        />
        <Form.Control
          value={buyAmount}
          type="range"
          min="2"
          step="1"
          max={scale.max}
          placeholder="Ethereum to spend"
          onChange={handleChangeAmount}
        />
      </Form.Group>
      {selectedEvent && <div>Price ~ {getPriceInEth(buyAmount, selectedEvent.ratio)}ETH + gas</div>}
      {selectedEvent && <div>Actual ratio - 1ETH = {selectedEvent.ratio}{selectedEvent.symbol} tokens</div>}
      <Button
        variant="success"
        block
        size="md"
        onClick={() => {
          onSubmit(buyAmount)
        }}
      >
        Buy {buyAmount} Tokens
      </Button>
    </Form>
  );
};

const AvailableTokens = ({ balance, selectedEvent }) => {
  const amount = tokensToNumber(balance.events[selectedEvent.address].balance)
  if (amount === 0) {
    return null
  }

  return (<div><small>You already have <b>{amount}</b> {selectedEvent.symbol} tokens</small></div>)
}

export { BuyForm, AvailableTokens };
