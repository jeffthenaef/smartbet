import BigNumber from "bignumber.js";
import store from "store";
import EventEmitter from "events";

import Contracts from "shared/contracts";

class EmitterHandler {
  constructor() {
    this.emitter = new EventEmitter();
  }
}
const mainAppEmitter = new EmitterHandler();

export { mainAppEmitter };

const tree = {};

const getTeamAddress = async (contract, i) => {
  const address = await contract.methods.teamTokenList(i).call();
  return address;
};

const getEventAddress = async (contract, i) => {
  const address = await contract.methods.tokenList(i).call();
  return address;
};

const loadTeamData = async (eventAddress, address) => {
  const { web3 } = store.getState();
  const contract = new web3.eth.Contract(Contracts.teamToken.abi, address);

  const teamName = await contract.methods.name().call();

  tree.registry.events[eventAddress].teams[address] = {
    name: teamName,
  };
};

const loadEventData = async (address) => {
  const { web3 } = store.getState();
  const contract = new web3.eth.Contract(Contracts.eventToken.abi, address);

  const eventName = await contract.methods.name().call();
  const teamsCount = web3.utils.hexToNumber(
    await contract.methods.getTeamTokensCount().call()
  );

  const teamAddresses = [];

  tree.registry.events[address] = {
    name: eventName,
    teams: {},
    teamsCount,
  };

  for (let i = 0; i < teamsCount; i += 1) {
    teamAddresses.push(getTeamAddress(contract, i));
  }

  await Promise.all(teamAddresses).then((values) => {
    values.forEach((value) => {
      loadTeamData(address, value);
    });
  });
};

const loadRegistryData = async () => {
  const {
    web3,
    contracts: { registry },
  } = store.getState();

  const eventsCount = web3.utils.hexToNumber(
    await registry.methods.getTokensCount().call()
  );
  const eventAddresses = [];

  tree.registry = {
    address: Contracts.registry.address,
    eventsCount,
    events: {},
  };

  for (let i = 0; i < eventsCount; i += 1) {
    eventAddresses.push(getEventAddress(registry, i));
  }

  await Promise.all(eventAddresses).then((values) => {
    values.forEach((value) => {
      loadEventData(value);
    });
  });
};

export const getContracts = () => {
  loadRegistryData();
};

export const BNToNumber = (bigNumber, decimalPlaces = 4) => {
  const number = new BigNumber(bigNumber).decimalPlaces(decimalPlaces);
  return number.toNumber();
};

export const BNToRangeNumber = (bigNumber) => {
  BigNumber.config({ DECIMAL_PLACES: 2, ROUNDING_MODE: 1 });
  return BigNumber(bigNumber, 10).toNumber();
};

export const toU256 = (variable) => (variable * 1e18).toString();

export const tokensToNumber = (balance) =>
  Math.floor((BNToNumber(balance) * 10e6) / 1e18) / 10e6;
