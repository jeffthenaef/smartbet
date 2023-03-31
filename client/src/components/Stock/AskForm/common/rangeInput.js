import React from "react";

import styles from "../styles/rangeInput.module.sass";

const RangeInput = ({ id, value, ...rest }) => {
  return (
    <label htmlFor={id} className={styles.label_wrapper}>
      <input
        {...rest}
        type="range"
        id={id}
        value={value}
        name={id}
        step={0.01}
        style={{
          background: `linear-gradient(to right, #fff 0%, #fff ${value}%, #000 ${value}%, #000 100%)`,
        }}
      />
      <span style={{ transform: `translateX(${value}%)` }}>{value}%</span>
    </label>
  );
};

export default RangeInput;
