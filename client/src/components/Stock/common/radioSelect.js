import React from 'react';
import { Col } from 'react-bootstrap';

import styles from './styles/radioSelect.module.sass'

const RadioInput = ({ label, id, checked, handleChange }) => (
  <label htmlFor={id} className={styles.radioInput}>
    <input type="radio" name={id} id={id} value={id} onChange={handleChange} checked={checked === id} />
    <span>{label}</span>
  </label>
);

const RadioSelect = ({ arr, checked, handleChange }) => (
  <Col className="m-0 p-0">
    {arr.map(({ id, name }) => (
      <RadioInput key={id} label={name} id={id} checked={checked} handleChange={handleChange} />
    ))}
  </Col>
);

export default RadioSelect;
