import contractsTree from "shared/contracts/contractsTree";

const Events = Object.keys(contractsTree.events).map((address) => ({
  name: contractsTree.events[address].name,
  category: contractsTree.events[address].category,
  address,
}));

const getEventsForCategory = (categoryName) =>
  Events.filter((event) => categoryName === event.category);

const Categories = [
  {
    name: "Football",
    slug: "football",
    events: getEventsForCategory("football"),
  },
  {
    name: "Formula",
    // slug: "formula",
    events: getEventsForCategory("formula"),
  },
  {
    name: "E-sport",
    events: getEventsForCategory("E-sport"),
  },
  {
    name: "Tennis",
    events: getEventsForCategory("Tennis"),
  },
];

const getTeamsForEvent = (event) => {
  const { teams } = contractsTree.events[event];
  return Object.keys(teams).map((address) => ({
    name: teams[address].name,
    address,
    eventAddress: contractsTree.events[event].address,
  }));
};

const getCategoryAndMatchedEvents = (categoryName = "Football") => {
  const indexForName = Categories.findIndex(
    (cat) => cat.slug.toLowerCase() === categoryName.toLowerCase()
  );
  const selectedCategory = Categories[indexForName];
  return {
    categories: [...Categories],
    selectedCategory,
    selectedCategoryEvents: selectedCategory.events,
  };
};

const getDepositAddresses = () => {
  const { deposit } = contractsTree;
  return {
    deposit: deposit.address,
    ...deposit.orderBooks,
  };
};

const AllAddresses = () => {
  const eventsAddresses = Events.map(({ address }) => address);

  const teamsAddresses = eventsAddresses.reduce((acc, address) => {
    const teams = getTeamsForEvent(address).map(({ address }) => address);
    acc.push(...teams);
    return acc;
  }, []);

  return {
    eventsAddresses,
    teamsAddresses,
  };
};

export {
  Events,
  Categories,
  getEventsForCategory,
  getTeamsForEvent,
  getCategoryAndMatchedEvents,
  AllAddresses,
  getDepositAddresses,
};
