import React from "react";

import Button from "components/common/Button";
import styles from "../styles/form.module.sass";

import Input from "./input";
import RangeInput from "./rangeInput";

import useAskForm from "./useAskForm";

import { BNToNumber } from "shared/helpers";

const BuyForm = ({ askType, data, onSubmit, priceCurrency, currency }) => {
  const { state, dispatch } = useAskForm(data);

  return (
    <div className={styles.form_wrapper}>
      <div>
        <h2>Buy {currency}</h2>
        <p>
          {BNToNumber(state.balance)} {priceCurrency}
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
            label="Unit price"
            id="buyPrice"
            currency={priceCurrency}
            value={state.price}
            step="0.0001"
            onChange={(e) =>
              dispatch({ type: "CHANGE_PRICE", payload: e.target.value })
            }
          />
          <Input
            label="Amount"
            id="buyAmount"
            currency={currency}
            value={state.amount}
            step="1"
            onChange={(e) =>
              dispatch({ type: "CHANGE_AMOUNT", payload: e.target.value })
            }
          />
          <RangeInput
            id="buyRange"
            value={state.range}
            onChange={(e) =>
              dispatch({ type: "CHANGE_RANGE", payload: e.target.value })
            }
          />
          <Input
            label="Total price"
            id="buySum"
            currency={priceCurrency}
            value={state.sum}
            max={state.balance}
            step="0.0001"
            onChange={(e) =>
              dispatch({ type: "CHANGE_SUM", payload: e.target.value })
            }
          />
        </>
        <Button variant="success" type="submit" className={styles.btn_primary}>
          Buy {currency}
        </Button>
      </form>
    </div>
  );
};

//             <RangeInput id="buyRange" value={state.range} onChange={e => dispatch({ type: 'CHANGE_RANGE', payload: e.target.value })} />

export default BuyForm;
