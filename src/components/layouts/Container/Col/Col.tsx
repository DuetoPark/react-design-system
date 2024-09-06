import React, { HTMLAttributes } from "react";
import classNames from "classnames";

export interface ColPropsType extends HTMLAttributes<HTMLDivElement> {
  xs: 1 | 2;
  sm: 1 | 2 | 3;
  md: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

const Col: React.FC<ColPropsType> = ({ className, children, xs, sm, md }) => {
  return (
    <div
      className={classNames(
        `col-xs-${xs}`,
        `col-sm-${sm}`,
        `col-md-${md}`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Col;
