import { selectEvent, loading } from 'duck/events';
import { getTeamsForEvent } from 'shared/contracts/contractsData';

async function handleChangeEvent(selectedEvent, user, dispatch) {
  const emptyTeams = getTeamsForEvent(selectedEvent.address)
  const fullfilledEvent = {
    ...selectedEvent,
    ...user.balance.events[selectedEvent.address],
  }

  const teams = emptyTeams.map((team) => {
    const onChainData = user.balance.teams[team.address]
    return {
      ...team,
      ...onChainData,
    }
  })

  dispatch(selectEvent({
    selectedEvent: fullfilledEvent,
    teams,
  }))
}

export {
  handleChangeEvent,
}


// kup tokeny event
// zrób refund event tokenów
