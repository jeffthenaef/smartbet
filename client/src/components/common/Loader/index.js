import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

const Loader = ({ className }) => (
  <span className={classnames(styles.loader, className)} />
);

export default Loader;
