import { UPDATE_BALANCES, UPDATE_USER } from './types';

const initialState = {
  imBusy: true,
  wallet: {
    address: null,
    weiBalance: 0,
    ethBalance: 0,
  },
  balance: {
    events: {},
    teams: {},
  },
};

function isEqual(a, b) {
  const _a = JSON.stringify(a).replace(/ /g, '')
  const _b = JSON.stringify(b).replace(/ /g, '')
  return _a === _b
}

export default (state = initialState, action = {}) => {
  const { payload = {} } = action;

  switch (action.type) {
    case UPDATE_USER:
      if (isEqual(state.wallet, payload)) {
        return state
      }

      return { ...state, wallet: { ...payload }, imBusy: false };

    case UPDATE_BALANCES:
      if (isEqual(state.balance, payload.balance)) {
        return state
      }

      if (isEqual(state.wallet, payload.wallet)) {
        return state
      }

      return { ...state, ...payload, imBusy: false };

    default:
      return state;
  }
};

export const updateUser = payload => (
  {
    type: UPDATE_USER,
    payload,
  }
);

export const updateBalances = payload => (
  {
    type: UPDATE_BALANCES,
    payload,
  }
);
