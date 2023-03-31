import React, { Component } from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

export const IconBar = () => (
  <div className={styles.icon}>
    <span className={styles.iconBar} />
    <span className={styles.iconBar} />
    <span className={styles.iconBar} />
  </div>
);

const TitleWithIcon = ({ className, children }) => (
  <div className={classnames(styles.titleContainer, className)}>
    <IconBar />
    <h2>{children}</h2>
  </div>
);

export default TitleWithIcon;
