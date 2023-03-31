import { useReducer } from "react";

import { BNToNumber, BNToRangeNumber } from "../../../../shared/helpers";

// ustaw range w stosunku do portfela
// zmien ilość qty
// zmien ilość pct
// zmien cenę za 1qty
const reducer = (state, action) => {
  let newRange;
  let newSum;
  let newAmount;
  let newPrice;

  const pattern = /[0-9]*[.]{0,1}[0-9]{0,4}/s;

  switch (action.type) {
    case "CHANGE_RANGE":
      newRange = BNToRangeNumber(action.payload);
      if (isNaN(newRange)) newRange = 0;
      newSum = BNToNumber((state.balance * newRange) / 100);
      newAmount = BNToNumber(newSum / state.price, 0);

      return { ...state, range: newRange, sum: newSum, amount: newAmount };
    case "CHANGE_PRICE":
      newPrice = action.payload;
      newPrice = Number(newPrice.match(pattern));
      if (newPrice == NaN || newPrice == "") newPrice = 0;
      newAmount = BNToNumber(state.sum / newPrice, 0);

      return { ...state, price: newPrice, amount: newAmount };

    case "CHANGE_AMOUNT":
      newAmount = action.payload;
      newAmount = Number(newAmount.match(pattern));
      if (newAmount == NaN || newAmount == "") newAmount = 0;

      newSum = BNToNumber(newAmount * state.price);
      if (newSum > state.balance) {
        newSum = state.balance;
        newAmount = BNToNumber(newSum / state.price, 0);
      }
      newRange = BNToRangeNumber((newSum / state.balance) * 100);
      if (isNaN(newRange)) newRange = 0;

      return { ...state, amount: newAmount, sum: newSum, range: newRange };

    case "CHANGE_SUM":
      newSum = action.payload;
      newSum = Number(newSum.match(pattern));
      if (newSum == NaN || newSum == "") newSum = 0;
      if (newSum > state.balance) newSum = state.balance;

      newAmount = BNToNumber(newSum / state.price, 0);
      if (newSum > state.balance) {
        newSum = state.balance;
        newAmount = BNToNumber(newAmount / state.price, 0);
      }
      newRange = BNToRangeNumber((newSum / state.balance) * 100);
      if (isNaN(newRange)) newRange = 0;

      return { ...state, sum: newSum, amount: newAmount, range: newRange };

    default:
      return state;
  }
};

const useAskForm = ({ balance, price }) => {
  const [state, dispatch] = useReducer(reducer, {
    balance,
    price,
    range: 0,
    amount: 0,
    sum: 0,
  });

  return { state, dispatch };
};

export default useAskForm;
