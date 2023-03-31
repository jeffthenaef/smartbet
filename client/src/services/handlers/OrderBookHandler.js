import AllContractsService from '../AllContractsService';
import TeamsHandler from './TeamsHandler';
import { tokensToNumber, toU256, BNToNumber } from 'shared/helpers';

class LogicFirstApproach {
  static handleAllStaticErrors = (classDeclaration) => {
    const notIncluded = ['length', 'name', 'prototype']
    const statics = Object.getOwnPropertyNames(classDeclaration).filter(el => !notIncluded.includes(el))

    statics.forEach((methodName) => {
      classDeclaration[methodName] = LogicFirstApproach._errorHandler(classDeclaration[methodName], `${classDeclaration.name}.${methodName}`)
    })
  }

  static _errorHandler = (_promise, fnName = 'method ...') => {
    const wrapper = async (...args) => {
      try {
        const result = await _promise(...args)
        return result
      } catch (err) {
        console.error({
          error: true,
          msg: err.message,
          method: fnName,
          err,
          args,
        })
        return {
          error: true,
          msg: err.message,
          method: fnName,
          err,
          args,
        }
      }
    }
    return wrapper
  }
}

const ethAddress = '0x0000000000000000000000000000000000000000'

class OrderBookHandler {
  static makeNewBuyOrder = (token, amount, eth, userAddress) => {
    const availableAddresses = AllContractsService.getAvailableAddresses()

    if (!availableAddresses.includes(token)) {
      throw new Error('Incorrect token address')
    }

    return new Promise((resolve, reject) => {

      const buyContract = AllContractsService.getStockContract('buy')

      const tokenValue = toU256(amount)
      const ethValue = toU256(eth)

      buyContract.methods
        .create(ethAddress, ethValue, token, tokenValue)
        .send({ from: userAddress, value: ethValue })
        .once('transactionHash', (txHash) => {
          resolve({
            success: true,
            from: userAddress,
            ethValue,
            txHash,
          })
        })
        .catch((err) => {
          reject(err)
        });
    })
  }

  static fullfillBuyOrder = async (order, userAddress) => {
    const { takeCurrency, take, creator } = order

    const success = await OrderBookHandler._approveBuy(takeCurrency, take, userAddress)

    if (!success) {
      throw new Error('transaction cannot be appoved')
    }

    const response = await OrderBookHandler._finalizeBuy(order, userAddress)
    return response
  }

  static fullfillSellOrder = (order, userAddress) => {
    return new Promise((resolve, reject) => {
      const sellContract = AllContractsService.getStockContract('sell')

      const { nonce, take } = order

      const value = toU256(take)

      console.log('fullfillSellOrder', order, userAddress)

      sellContract.methods
        .finalize(nonce)
        .send({ from: userAddress, value })
        .once('transactionHash', (txHash) => {
          resolve({
            success: true,
            from: userAddress,
            txHash,
          })
        })
        .catch((err) => {
          reject(err)
        });
    })
  }

  static makeNewSellOrder = async (token, amount, eth, userAddress) => {
    const availableAddresses = AllContractsService.getAvailableAddresses()

    if (!availableAddresses.includes(token)) {
      throw new Error('Incorrect token address')
    }

    const success = await OrderBookHandler._approveSell(token, amount, userAddress)

    if (!success) {
      throw new Error('transaction cannot be appoved')
    }

    await OrderBookHandler._createSellOrder(token, amount, eth, userAddress)
  }



  static _approveSell = async (token, amount, userAddress) => {
    const sellContract = AllContractsService.getStockContract('sell')
    const teamContract = AllContractsService.getTeamContract(token)
    const { success } = await TeamsHandler.approve(teamContract, amount, sellContract, userAddress)
    return success
  }

  static _createSellOrder = (token, amount, eth, userAddress) => {
    return new Promise((resolve, reject) => {
      const sellContract = AllContractsService.getStockContract('sell')

      const tokenValue = toU256(amount)
      const ethValue = toU256(eth)

      sellContract.methods
        .create(token, tokenValue, ethAddress, ethValue)
        .send({ from: userAddress })
        .once('transactionHash', (txHash) => {
          resolve({
            success: true,
            from: userAddress,
            ethValue,
            txHash,
          })
        })
        .catch((err) => {
          reject(err)
        });
    })
  }


  static _approveBuy = async (token, amount, userAddress) => {
    const buyContract = AllContractsService.getStockContract('buy')
    const teamContract = AllContractsService.getTeamContract(token)
    const { success } = await TeamsHandler.approve(teamContract, amount, buyContract, userAddress)
    return success
  }


  // TODO
  static _finalizeBuy = (order, userAddress) => {
    return new Promise((resolve, reject) => {
      const buyContract = AllContractsService.getStockContract('buy')
      const { nonce, creator, give } = order

      resolve(true)
      buyContract.methods
        .finalize(nonce)
        .send({ from: userAddress })
        .once('transactionHash', (txHash) => {
          resolve({
            success: true,
            from: userAddress,
            txHash,
          })
        })
        .catch((err) => {
          reject(err)
        });
    })
  }

}


// ok, kolejne pytania @Marcin Majchrzak

// Czy mogę dokonywać swapów między sobą - czyli adres 0x111 wystawia order i adres 0x111 go skupuje


// LogicFirstApproach.handleAllStaticErrors(OrderBookHandler)
export default OrderBookHandler
