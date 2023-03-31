import { LOADING, UPDATE_ORDERS } from './types';

const initialState = {
  imBusy: true,
  buys:[],
  sells:[]
};

export default (state = initialState, action) => {
  const { payload = {}, type } = action;

  switch (type) {
    case UPDATE_ORDERS:
      return {
        ...state,
        ...payload,
        imBusy: false
      };
 
    case LOADING:
      return { ...state, imBusy: true };

    default:
      return state;
  }
};
 
export const updateOrders = (payload) => {
  return (
    {
      type: UPDATE_ORDERS,
      payload,
    }
  );
};

export const loading = () => (
  {
    type: LOADING,
    payload: {},
  }
);
