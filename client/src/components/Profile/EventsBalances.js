import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { TitleWithIcon, WidgetBox, Button } from 'components/common'
import { tokensToNumber, toU256 } from 'shared/helpers';
import contractsTree from 'shared/contracts/contractsTree';

function useEvents(events) {
  const eventsList = useMemo(() => Object.entries(events).map(([address, value]) => ({ address, ...value, ...contractsTree.events[address] })), [events])
  return { eventsList }
}

const EventTableRow = ({ name, symbol, balance }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{symbol}</td>
      <td>{tokensToNumber(balance)}</td>
      <td><Button variant="success" size="sm">Trade</Button></td>
      <td><Button variant="warning" size="sm">Check on Etherscan</Button></td>
    </tr>
  )
}

const EventsTokensBalances = ({ events }) => {
  const { eventsList } = useEvents(events)
  if (Object.keys(events).length === 0) {
    return null
  }
  return (
    <>
      <TitleWithIcon>
        Event Tokens
      </TitleWithIcon>
      <WidgetBox>
        <Table responsive="md">
          <thead>
            <tr>
              <th>Event</th>
              <th>Token</th>
              <th>Quantity</th>
              <th>Action</th>
              <th>Etherscan</th>
            </tr>
          </thead>
          <tbody>
            {eventsList.map(event => <EventTableRow key={event.address} {...event} />)}
          </tbody>
        </Table>
      </WidgetBox>
    </>
  )
}


const mapStateToProps = ({
  user,
}) => ({
  events: user.balance.events,
});

export default connect(mapStateToProps)(EventsTokensBalances);
