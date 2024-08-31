import React, { FormEvent, InputHTMLAttributes, useState } from "react";
import * as PrimitiveSwitch from "@radix-ui/react-switch";
import classNames from "classnames";

import "./_switch.scss";

export interface SwitchStyleProps {
  /** switch 크기 */
  size?: "small" | "medium";
}

export interface SwitchAttrProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** label과 매칭되는 ID  */
  id: string;
  /** switch 상태 */
  active?: boolean;
  /** switch 상호작용 */
  disabled?: boolean;
  /** switch 이벤트 */
  onChange?: (e?: FormEvent<HTMLInputElement>) => void;
}

export type SwitchPropsType = SwitchStyleProps & SwitchAttrProps;

const Switch: React.FC<SwitchPropsType> = ({
  id,
  active = false,
  disabled,
  size = "medium",
  required,
  name,
  value,
  onChange,
  className,
}) => {
  const [checked, setChecked] = useState<boolean>(active);

  const handleCheckedChange = (newValue: boolean) => {
    setChecked(newValue);
    if (onChange) onChange();
  };
  return (
    <PrimitiveSwitch.Root
      className={classNames("switch", `switch--${size}`, className)}
      id={id}
      checked={checked}
      disabled={disabled}
      required={required}
      name={name}
      value={value}
      onCheckedChange={handleCheckedChange}
    >
      <PrimitiveSwitch.Thumb
        className={classNames("switch--thumb", `switch--thumb-${size}`)}
      />
    </PrimitiveSwitch.Root>
  );
};

export default Switch;
