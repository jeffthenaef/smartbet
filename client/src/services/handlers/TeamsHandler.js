import { tokensToNumber, toU256, BNToNumber } from 'shared/helpers';

class TeamsHandler {
  static approve = (teamContract, value, orderbookContract, userAddress) => {
    return new Promise((resolve, reject) => {
      const u256 = toU256(value)
      console.log('approve', userAddress, orderbookContract._address)

      const approval = teamContract.methods
        .increaseAllowance(orderbookContract._address, u256)
        .send({ from: userAddress })
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
  };

  static _getDecimals = async (teamContract) => {
    if (!teamContract) {
      throw new Error('Team contract not initiated')
    }
    try {
      const decimals = await teamContract.methods.decimals().call()
      return decimals
    } catch (err) {
      return 1
    }
  };

  static _getConversionRatio = async (teamContract) => {
    try {
      const convertionRatio = await teamContract.methods.conversionRatio().call()
      return convertionRatio
    } catch (err) {
      return 1
    }
  };

  static _getSymbol = async (teamContract) => {
    try {
      const symbol = await teamContract.methods.symbol().call()
      return symbol;
    } catch (err) {
      return 'UNKNOWN'
    }
  };

  static _getTotalSupply = async (teamContract) => {
    try {
      const totalSupply = await teamContract.methods.totalSupply().call();
      return totalSupply
    } catch (err) {
      return 0
    }
  };


  static _getBalance = async (teamContract, userAddress) => {
    try {
      const balanceOf = await teamContract.methods.balanceOf(userAddress).call();
      return balanceOf
    } catch (err) {
      return 0
    }
  };

  static getChainData = async (teamContract, userAddress) => {
    const ratio = await TeamsHandler._getConversionRatio(teamContract);
    const symbol = await TeamsHandler._getSymbol(teamContract);
    const totalSupply = await TeamsHandler._getTotalSupply(teamContract);
    const balance = await TeamsHandler._getBalance(teamContract, userAddress);

    return {
      ratio,
      symbol,
      totalSupply,
      balance,
    };
  };

  static getTokenData = async (teamContract) => {
    const ratio = await TeamsHandler._getConversionRatio(teamContract)
    const symbol = await TeamsHandler._getSymbol(teamContract)
    const decimals = await TeamsHandler._getDecimals(teamContract)
    return {
      ratio, symbol, decimals,
    }
  }
}

export default TeamsHandler;
