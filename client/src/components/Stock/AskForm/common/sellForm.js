import React from "react";

import Button from "components/common/Button";
import styles from "../styles/form.module.sass";

import Input from "./input";
import RangeInput from "./rangeInput";

import useSellForm from "./useSellForm";
import { BNToNumber } from "shared/helpers";

const SellForm = ({ askType, data, onSubmit, priceCurrency, currency }) => {
  const { state, dispatch } = useSellForm(data);

  return (
    <div className={styles.form_wrapper}>
      <div>
        <h2>Sell {priceCurrency}</h2>
        <p>
          {BNToNumber(state.balance, 0)} {priceCurrency}
        </p>
      </div>

      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          onSubmit(state);
        }}
      >
        <>
          <Input
            label="Amount"
            id="sellAmount"
            currency={priceCurrency}
            value={state.amount}
            max={state.balance}
            step="1"
            onChange={(e) =>
              dispatch({ type: "CHANGE_AMOUNT", payload: e.target.value })
            }
          />
          <Input
            label="Unit price"
            id="sellPrice"
            currency={currency}
            value={state.price}
            step="0.0001"
            onChange={(e) =>
              dispatch({ type: "CHANGE_PRICE", payload: e.target.value })
            }
          />
          <RangeInput
            id="sellRange"
            value={state.range}
            onChange={(e) =>
              dispatch({ type: "CHANGE_RANGE", payload: e.target.value })
            }
          />

          <Input
            label="Total price"
            id="sellSum"
            currency={currency}
            value={state.sum}
            step="0.0001"
            onChange={(e) =>
              dispatch({ type: "CHANGE_SUM", payload: e.target.value })
            }
          />
        </>
        <Button variant="danger" type="submit" className={styles.btn_secondary}>
          Sell {priceCurrency}
        </Button>
      </form>
    </div>
  );
};
{
}
// <RangeInput id="sellRange" value={state.range} onChange={e => dispatch({ type: 'CHANGE_RANGE', payload: e.target.value })} />

export default SellForm;
