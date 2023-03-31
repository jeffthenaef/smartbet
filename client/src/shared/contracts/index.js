import RegistryABI from './ABI/Registry.json';
import EventTokenABI from './ABI/EventToken.json';
import TeamTokenABI from './ABI/TeamToken.json';

import BuyOrderBookABI from './ABI/BuyOrderBook.json';
import SellOrderBookABI from './ABI/SellOrderBook.json';
import DepositABI from './ABI/Deposit.json';

const tree = require('./TreeData/treeV3.json')

export const RegistryAddress = tree.registry.address

const Contracts = {
  registry: { abi: RegistryABI, address: RegistryAddress },
  eventToken: { abi: EventTokenABI },
  teamToken: { abi: TeamTokenABI },
  buyOrderBook: { abi: BuyOrderBookABI.abi },
  sellOrderBook: { abi: SellOrderBookABI.abi },
  deposit: { abi: DepositABI.abi },
};

export default Contracts;
