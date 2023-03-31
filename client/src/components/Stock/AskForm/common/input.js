import React from "react";

import styles from "../styles/input.module.sass";

const Input = ({
  id,
  label,
  currency,
  value = "",
  step = "0.00000001",
  ...rest
}) => (
  <label htmlFor={id} className={styles.label_wrapper}>
    <span>{label}</span>
    <input
      autoComplete="off"
      id={id}
      type="number"
      value={value}
      name={id}
      min={0}
      step={step}
      {...rest}
    />
    <span>{currency}</span>
  </label>
);

export default Input;
