import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

const ExternalLink = ({
  href,
  className,
  children,
  rest,
}) => (
  <a
    className={classnames(className, styles.link)}
    target="_blank"
    rel="noopener noreferrer"
    {...{ href, ...rest }}
  >
    {children}
  </a>
);

export default ExternalLink;
