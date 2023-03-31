import { useReducer } from "react";

import { BNToNumber, BNToRangeNumber } from "../../../../shared/helpers";

const reducer = (state, action) => {
  let newRange;
  let newSum;
  let newAmount;
  let newPrice;

  const pattern = /[0-9]*[.]{0,1}[0-9]{0,4}/s;

  switch (action.type) {
    case "CHANGE_RANGE":
      newRange = action.payload;
      newAmount = Math.floor(state.balance * newRange);
      newSum = BNToNumber(newAmount * state.price);
      if (isNaN(newRange)) newRange = 0;

      return { ...state, range: newRange, amount: newAmount, sum: newSum };
    case "CHANGE_AMOUNT":
      newAmount = action.payload;
      newAmount = newAmount.match(pattern);
      if (newAmount == NaN || newAmount == "") newAmount = 0;
      if (newAmount > state.balance) newAmount = Math.floor(state.balance);
      newSum = BNToNumber(newAmount * state.price);
      newRange = (newAmount / state.balance) * 100;
      if (isNaN(newRange)) newRange = 0;
      return { ...state, amount: newAmount, sum: newSum, range: newRange };

    case "CHANGE_PRICE":
      newPrice = action.payload;
      newPrice = newPrice.match(pattern);

      if (newPrice == NaN || newPrice == "") newPrice = 0;
      newSum = BNToNumber(state.amount * newPrice);

      return { ...state, price: newPrice, sum: newSum };

    case "CHANGE_SUM":
      newSum = action.payload;
      newSum = newSum.match(pattern);
      if (newSum == NaN || newSum == "") newSum = 0;

      newAmount = BNToNumber(newSum / state.price, 0);
      if (newAmount > state.balance) {
        newAmount = Math.floor(state.balance);
        newSum = BNToNumber(newAmount * state.price);
      }
      newRange = BNToRangeNumber((newSum / state.balance) * 10000);
      if (isNaN(newRange)) newRange = 0;

      return { ...state, sum: newSum, amount: newAmount, range: newRange };

    default:
      return state;
  }
};

const useSellForm = ({ balance, price }) => {
  const [state, dispatch] = useReducer(reducer, {
    balance,
    price,
    range: 0,
    amount: 0,
    sum: 0,
  });

  return { state, dispatch };
};

export default useSellForm;
