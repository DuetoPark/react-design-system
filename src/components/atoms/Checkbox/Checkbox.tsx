import React, { FormEvent, InputHTMLAttributes, useState } from "react";
import * as PrimitiveCheckbox from "@radix-ui/react-checkbox";
import classNames from "classnames";

import "./_checkbox.scss";

import Icon from "../Icon";

const checkboxSizeMap = {
  normal: {
    icon: 16,
  },
  small: {
    icon: 14,
  },
};

export type CheckboxStateType = boolean | "indeterminate";

export interface CheckboxStyleProps {
  /** checkbox 종류 */
  variant?: "square" | "round" | "ghost";
  /** checkbox 크기 */
  size?: keyof typeof checkboxSizeMap;
}

export interface CheckboxAttrProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** label과 매칭되는 ID */
  id: string;
  /** checkbox 상태 */
  state?: CheckboxStateType;
  /** checkbox 이벤트 */
  onChange?: (e?: FormEvent<HTMLInputElement>) => void;
}

export type CheckboxPropsType = CheckboxAttrProps & CheckboxStyleProps;

const Checkbox: React.FC<CheckboxPropsType> = ({
  id,
  variant = "square",
  size = "normal",
  state = false,
  disabled,
  required,
  name,
  onChange,
}) => {
  const [checked, setChecked] = useState<CheckboxStateType>(state);

  const handleChange = () => {
    setChecked(!checked);
    if (onChange) onChange();
  };

  return (
    <PrimitiveCheckbox.Root
      className={classNames(
        "checkbox",
        `checkbox--${variant}`,
        `checkbox--${size}`
      )}
      disabled={disabled}
      required={required}
      checked={checked}
      name={name}
      id={id}
      onCheckedChange={handleChange}
    >
      <div className="checkbox--box">
        <CheckIcon variant={variant} size={size} />

        <PrimitiveCheckbox.Indicator className="checkbox--indicator">
          <CheckIcon variant={variant} size={size} />
        </PrimitiveCheckbox.Indicator>
      </div>

      <div className="checkbox--interaction" aria-hidden></div>
    </PrimitiveCheckbox.Root>
  );
};

// CheckIcon
const getCheckboxIconSize = ({
  variant,
  size = "normal",
}: CheckboxStyleProps): number => {
  return variant === "ghost"
    ? checkboxSizeMap[size].icon + 8
    : checkboxSizeMap[size].icon;
};

const CheckIcon: React.FC<CheckboxStyleProps> = ({
  variant,
  size = "normal",
}) => {
  return (
    <Icon
      className="checkbox--icon"
      icon="CheckThick"
      size={getCheckboxIconSize({ variant, size })}
    />
  );
};

export default Checkbox;
