import React, { PropsWithChildren } from "react";
import * as PrimitiveAspectRatio from "@radix-ui/react-aspect-ratio";
import classNames from "classnames";

import "./_aspectRatio.scss";

export interface AspectRatioPropsType extends PropsWithChildren {
  /** ratio 비율 */
  ratio: number;
  /** container 클래스명 */
  className?: string;
}

const AspectRatio: React.FC<AspectRatioPropsType> = ({
  ratio,
  className,
  children,
}) => {
  return (
    <div className={classNames("ratio--container", className)}>
      <PrimitiveAspectRatio.Root className="ratio" ratio={ratio} asChild>
        {children}
      </PrimitiveAspectRatio.Root>
    </div>
  );
};

export default AspectRatio;
