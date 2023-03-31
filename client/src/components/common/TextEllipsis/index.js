import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

const TextEllipsis = ({ children, className }) => (
  <div className={classnames(styles.text, className)}>{children}</div>
);

export default TextEllipsis;
