import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


import blockchainController from 'services/BlockchainService'
import { ordersWatcher, BalanceHandler, AllContractsService } from 'services'
import Contracts from 'shared/contracts';

import { updateBalances } from 'duck/user';
import { updateOrders } from 'duck/orders';


async function updateBalance(wallet, dispatch) {
    try {
        const teams = await BalanceHandler.getAllBalancesForAllTeams(wallet.address)
        const events = await BalanceHandler.getAllBalancesForEvents(wallet.address)
        dispatch(updateBalances({
            balance: {
                events,
                teams,
            },
            wallet,
        }))
    } catch (err) {
        alert(err.message)
    }
}

function updateAllOrders(orders, dispatch) {
    dispatch(updateOrders(orders))
}

async function init(walletWasConnected, initializedContracts) {
    try {
        await blockchainController.initWeb3()
        walletWasConnected(true)
        await blockchainController.initContracts(Contracts.registry.abi, Contracts.registry.address)
        await AllContractsService.init()
        initializedContracts(true)
    } catch (err) {
        alert(err.message)
    }
}




const useWalletAndContracts = () => {
    const [imBusy, setBusy] = useState(true)
    const [isWalletConnected, walletWasConnected] = useState(false)
    const [isContractsInitialized, setContractsInitialized] = useState(false)

    const reconnectWallet = useCallback(() => {
        init(walletWasConnected, setContractsInitialized)
    }, [])

    useEffect(() => {
        init(walletWasConnected, setContractsInitialized)
    }, [])

    return {
        imBusy, setBusy,
        isWalletConnected,
        isContractsInitialized,
        reconnectWallet
    }
}


const useWatchers = ({
    imBusy, setBusy, isWalletConnected, isContractsInitialized
}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (isWalletConnected && isContractsInitialized) {
            ordersWatcher.watching((orders) => {
                updateAllOrders(orders, dispatch)

                // very bad solution, to do in backend
                fetch(`/api/orders`, {
                    method: 'POST',
                    mode:'cors', 
                    body: JSON.stringify(orders),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': `http:/localhost:5000`,
                        'Origin':'http://localhost:5000'
                    }
                })
            })

            blockchainController.watchingAccount((wallet) => {
                if (imBusy) {
                    setBusy(false)
                }
                updateBalance(wallet, dispatch)
            })
        }
    }, [isWalletConnected, isContractsInitialized])

    return null
}



export {
    useWalletAndContracts, useWatchers
}
