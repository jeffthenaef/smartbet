import React, { memo } from "react";
import Button from "react-bootstrap/Button";

export const SuccessButton = ({ onClick, children, className, size }) => (
  <Button variant="success" {...{ onClick, className, size }}>
    {children}
  </Button>
);

export const WarningButton = ({ onClick, children, className, size }) => (
  <Button variant="warning" {...{ onClick, className, size }}>
    {children}
  </Button>
);

export const DisabledButton = ({ children, className, size }) => (
  <Button className="btn-dark">{children}</Button>
);

const DefaultButton = memo(({ children, ...rest }) => (
  <Button {...{ ...rest }}>{children}</Button>
));

export default DefaultButton;
