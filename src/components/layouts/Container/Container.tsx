import React, { HTMLAttributes } from "react";
import classNames from "classnames";

import "./_container.scss";

export type ContainerPropsType = HTMLAttributes<HTMLDivElement>;

const Container: React.FC<ContainerPropsType> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={classNames("container", className)} {...props}>
      <div className="row">{children}</div>
    </div>
  );
};

export default Container;
