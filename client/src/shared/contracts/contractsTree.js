const tree = require('./TreeData/treeV3.json')

const { registry, deposit } = tree

function preprocessToApp() {
  const categories = Object.keys(registry.events)
  // console.log('categories', categories)

  function prepareTeams(teams) {
    return teams.reduce((acc, { address, name }) => {
      return {
        ...acc,
        [address]: {
          name,
        },
      }
    }, {})
  }

  const events = categories.reduce((events, category) => {
    const { name, address, config, pricing, teams } = registry.events[category]
    // console.log('registry.events[category]', registry.events[category])
    const preprocessed = {
      category,
      name,
      config,
      pricing,
      teams: prepareTeams(teams),
    }

    return {
      ...events,
      [address]: preprocessed,
    }
  }, {})
  // console.log('events', events)

  return {
    address: registry.address,
    eventsCount: registry.eventsCount,
    events,
    deposit,
  }
}

export default preprocessToApp()
