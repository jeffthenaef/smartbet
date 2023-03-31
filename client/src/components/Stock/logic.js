import { OrderBookHandler } from 'services'

export async function createSellOrder(addressTokenToSell, sellAmount, ethPrice, userAddress) {
  try {
    await OrderBookHandler.makeNewSellOrder(addressTokenToSell, sellAmount, ethPrice, userAddress)
  } catch (err) {
    alert(err.message)
    return {
      error:true,
      msg: err.message
    }
  }
}

export async function createBuyOrder(addressTokenToBuy, buyAmount, ethProposition, userAddress) {
  try {
    await OrderBookHandler.makeNewBuyOrder(addressTokenToBuy, buyAmount, ethProposition, userAddress)
  } catch (err) {
    alert(err.message)
    return {
      error:true,
      msg: err.message
    }
  }
}

export async function fullfillBuyOrder(order, userAddress) {
  try {
    await OrderBookHandler.fullfillBuyOrder(order, userAddress)
  } catch (err) {
    alert(err.message)
    return {
      error:true,
      msg: err.message
    }
  }
}

export async function fullfillSellOrder(order, userAddress) {
  try {
    await OrderBookHandler.fullfillSellOrder(order, userAddress)
  } catch (err) {
    alert(err.message)
    return {
      error:true,
      msg: err.message
    }
  }
}

function cancelOrder(orderId) {
  // usuń order
  // jednak nie chcę kupić 50 tokenów RUS19 za 0.05ETH i usuwam swoją pozycje
  // czy mozna usunać order 
}

  
