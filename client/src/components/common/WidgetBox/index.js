import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

export const WidgetContent = ({ className, children }) => (
  <div className={classnames(styles.widgetContent, className)}>
    {children}
  </div>
);

const WidgetBox = ({ className, children }) => (
  <div className={classnames(styles.widget, className)}>
    {children}
  </div>
);


export default WidgetBox;
