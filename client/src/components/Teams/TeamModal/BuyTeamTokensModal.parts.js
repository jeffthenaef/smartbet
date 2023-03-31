import React, { useState, useEffect, useCallback } from 'react';
import { tokensToNumber, toU256 } from 'shared/helpers';
import {
  Form,
} from 'react-bootstrap'
import { Button } from 'components/common';

const getMinMaxBasedOnEventAndTeam = (selectedEvent, { ratio }) => {
  const eventTokens = selectedEvent.balance
  const max = Math.floor(tokensToNumber(eventTokens * ratio))
  const min = 0
  return { max, min }
}

function getPriceInEth(amount, ratio) {
  return (amount / ratio)
}

const BuyForm = ({ user, selectedEvent, team, onSubmit }) => {
  const [scale, setScale] = useState({ min: 10, max: 100 });
  const [buyAmount, setBuyAmount] = useState('10');

  useEffect(() => {
    const scale = getMinMaxBasedOnEventAndTeam(selectedEvent, team)
    setScale(scale)
  }, [selectedEvent])

  const handleChangeAmount = useCallback((e) => {
    setBuyAmount(e.target.value)
  }, [])

  return (
    <Form>
      <Form.Group>
        <Form.Label>
          Select amount to exchange
        </Form.Label>
        <Form.Control
          value={buyAmount}
          type="number"
          min={team.ratio}
          step={team.ratio}
          max={scale.max}
          placeholder="Ethereum to spend"
          onChange={handleChangeAmount}
        />
        <Form.Control
          value={buyAmount}
          type="range"
          min={team.ratio}
          step={team.ratio}
          max={scale.max}
          placeholder="Ethereum to spend"
          onChange={handleChangeAmount}
        />
      </Form.Group>
      {selectedEvent && <div>Price ~ {getPriceInEth(buyAmount, team.ratio)}{selectedEvent.symbol} + gas</div>}
      {selectedEvent && <div>Actual ratio - 1{selectedEvent.symbol} = {team.ratio}{team.symbol} tokens</div>}
      <Button
        variant="success"
        block
        size="md"
        onClick={() => {
          onSubmit(buyAmount)
        }}
      >
        Get {buyAmount} Tokens
      </Button>
    </Form>
  );
};

const AvailableTokens = ({ balance, selectedTeam }) => {
  const amount = tokensToNumber(balance.teams[selectedTeam.address].balance)
  if (amount === 0) {
    return null
  }

  return (<div><small>You already have <b>{amount}</b> {selectedTeam.symbol} tokens</small></div>)
}

export { BuyForm, AvailableTokens };
