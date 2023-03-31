import { OrderBookHandler } from 'services'

const finalizeBuy = async (order, userAddress) => {
    console.log('finalizeBuy', order, userAddress)
    try {
        const response = await OrderBookHandler.fullfillBuyOrder(order, userAddress)
    } catch (err) {
        alert(err.message)
    }
}

const finalizeSell = async (order, userAddress) => {
    console.log('finalizeSell', order, userAddress)

    try {
        const response = await OrderBookHandler.fullfillSellOrder(order, userAddress)

    } catch (err) {
        alert(err.message)
    }
}

export {
    finalizeSell, finalizeBuy
}