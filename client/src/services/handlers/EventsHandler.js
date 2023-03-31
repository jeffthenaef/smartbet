import { tokensToNumber, toU256, BNToNumber } from 'shared/helpers';

class EventsHandler {
  static _getConversionRatio = async (eventContract) => {
    if (!eventContract) {
      throw new Error('Event contract not initiated')
    }
    try {
      const convertionRatio = await eventContract.methods.ratio().call()
      return convertionRatio
    } catch (err) {
      return 1
    }
  };

  static _getDecimals = async (eventContract) => {
    if (!eventContract) {
      throw new Error('Event contract not initiated')
    }
    try {
      const decimals = await eventContract.methods.decimals().call()
      return decimals
    } catch (err) {
      return 1
    }
  };

  static _getSymbol = async (eventContract) => {
    if (!eventContract) {
      throw new Error('Event contract not initiated')
    }
    try {
      const symbol = await eventContract.methods.symbol().call()
      return symbol;
    } catch (err) {
      return 'UNKNOWN'
    }
  };

  static _getTotalSupply = async (eventContract) => {
    if (!eventContract) {
      throw new Error('Event contract not initiated')
    }
    try {
      const totalSupply = await eventContract.methods.totalSupply().call();
      return totalSupply
    } catch (err) {
      return 0
    }
  };

  static _getBalance = async (eventContract, userAddress) => {
    if (!eventContract) {
      throw new Error('Event contract not initiated')
    }
    const availableTokens = await eventContract.methods.balanceOf(userAddress).call()
    return availableTokens
  };

  static getChainData = async (eventContract, userAddress) => {
    const ratio = await EventsHandler._getConversionRatio(eventContract)
    const symbol = await EventsHandler._getSymbol(eventContract)
    const totalSupply = await EventsHandler._getTotalSupply(eventContract)
    const balance = await EventsHandler._getBalance(eventContract, userAddress)
    return {
      ratio, symbol, totalSupply, balance,
    }
  }

  static getTokenData = async (eventContract) => {
    const ratio = await EventsHandler._getConversionRatio(eventContract)
    const symbol = await EventsHandler._getSymbol(eventContract)
    const decimals = await EventsHandler._getDecimals(eventContract)
    return {
      ratio, symbol, decimals,
    }
  }

  static buyEventToken = (eventContract, userAddress, preciseAmount) => {
    if (!eventContract) {
      throw new Error('Event contract not initiated')
    }
    const value = toU256(preciseAmount)

    return new Promise((resolve, reject) => {
      eventContract.methods.buy()
        .send({ from: userAddress, value })
        .once('transactionHash', (txHash) => {
          resolve({
            success: true,
            from: userAddress,
            value,
            txHash,
          })
        })
        .catch((err) => {
          reject(err)
        });
    })
  }

  static buyTeamToken = async (eventContract, userAddress, teamAddress, preciseAmount) => {
    if (!eventContract) {
      throw new Error('Event contract not initiated')
    }

    const balance = await EventsHandler._getBalance(eventContract, userAddress);

    if (balance === 0) {
      throw new Error('You have no event tokens')
    }

    const value = toU256(preciseAmount);

    return new Promise((resolve, reject) => {
      eventContract.methods.convert(value, teamAddress)
        .send({ from: userAddress })
        .once('transactionHash', (txHash) => {
          resolve({
            success: true,
            from: userAddress,
            value,
            teamAddress,
            txHash,
          })
        })
        .catch(reject);
    })
  };
}

export default EventsHandler;
