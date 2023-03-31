import AllContractsService from '../AllContractsService';
import { tokensToNumber, toU256, BNToNumber } from 'shared/helpers';

class OrdersWatcher {
  constructor() {
    this.buys = []
    this.sells = []
  }

  _makeReadableOrder = ({
    nonce, creator, status, take, takeCurrency, give, giveCurrency,
  }) => {
    return {
      nonce:Number(nonce), 
      creator, status:Number(status),
      take: tokensToNumber(take),
      takeCurrency, 
      give: tokensToNumber(give),
      giveCurrency,
    }
  }


  _getAllOrdersForSingleContract = async (contract) => {
    const nonce = await contract.methods.nonce().call()
    const nonces = new Array(Number(nonce)).fill().map((_, idx) => idx)
    const orders = await Promise.all(nonces.map(idx => contract.methods.orders(idx).call()))
    const orderNotFullfilled = ({ status }) => status === 0
    return orders.map(this._makeReadableOrder).filter(orderNotFullfilled)
  }

  _getOrders = async () => {
    try {
      const sellContract = AllContractsService.getStockContract('sell')
      const buyContract = AllContractsService.getStockContract('buy')

      const sellOrders = await this._getAllOrdersForSingleContract(sellContract)
      const buyOrders = await this._getAllOrdersForSingleContract(buyContract)

      this.sells = [...sellOrders]
      this.buys = [...buyOrders]
      return true
    } catch (err) {
      return false
    }
  }

  _nextWatchStep = (cb) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      this.watching(cb);
    }, 5000);
  }


  watching = (cb) => {
    this._getOrders().then((fetchedWithSuccess) => {
      if (fetchedWithSuccess) {
        cb({
          buys: [...this.buys],
          sells: [...this.sells]
        })
      }
      this._nextWatchStep(cb)
    })
      .catch((err) => {
        this._nextWatchStep(cb)
        return;
      })
  }
}
const watcher = new OrdersWatcher()
export default watcher