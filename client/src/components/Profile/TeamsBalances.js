import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { TitleWithIcon, WidgetBox, Button } from 'components/common'
import { tokensToNumber, toU256 } from 'shared/helpers';
import contractsTree from 'shared/contracts/contractsTree';

function useTeams(teams) {
  const teamsList = useMemo(() => Object.entries(teams).map(([address, value]) => ({ address, ...value })).filter(team => Number(team.balance) !== 0), [teams])
  return { teamsList }
}

const TeamTableRow = ({ name, symbol, balance }) => {
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

const TeamsTokensBalances = ({ teams }) => {
  const { teamsList } = useTeams(teams)
  console.log(teamsList)
  if (Object.keys(teams).length === 0) {
    return null
  }
  return (
    <>
      <TitleWithIcon>
        Teams Tokens
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
            {teamsList.map(team => <TeamTableRow key={team.address} {...team} />)}
          </tbody>
        </Table>
      </WidgetBox>
    </>
  )
}


const mapStateToProps = ({
  user,
}) => ({
  teams: user.balance.teams,
});

export default connect(mapStateToProps)(TeamsTokensBalances);
