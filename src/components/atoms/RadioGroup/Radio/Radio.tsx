import React, { InputHTMLAttributes } from "react";
import * as PrimitiveRadioGroup from "@radix-ui/react-radio-group";
import classNames from "classnames";

import "./_radio.scss";

import Icon from "../../Icon";

const radioSizeMap = {
  normal: {
    icon: 16,
  },
  small: {
    icon: 14,
  },
};

export type RadioSizeType = keyof typeof radioSizeMap;

export interface RadioItemProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** label과 매칭되는 ID  */
  id: string;
  /** radio 값 */
  value: string;
  /** radio 문구 */
  text: string;
  /** radio 상호작용 */
  disabled?: boolean;
  /** radio 크기 */
  size?: RadioSizeType;
  /** radio 클래스명 */
  className?: string;
}

const Radio: React.FC<Omit<RadioItemProps, "text">> = ({
  id,
  value,
  disabled,
  size = "normal",
  className,
}) => {
  return (
    <PrimitiveRadioGroup.Item
      id={id}
      className={classNames("radio", `radio--${size}`, className)}
      value={value}
      disabled={disabled}
    >
      <div className="radio--box">
        <PrimitiveRadioGroup.Indicator className="radio--indicator">
          <DotIcon size={size} />
        </PrimitiveRadioGroup.Indicator>
      </div>

      <div className="radio--interaction" aria-hidden></div>
    </PrimitiveRadioGroup.Item>
  );
};

// DotIcon
const getRadioIconSize = (size: RadioSizeType): number => {
  return radioSizeMap[size].icon;
};

const DotIcon: React.FC<{ size: RadioSizeType }> = ({
  size = "normal",
  ...props
}) => {
  return (
    <Icon
      className="radio--icon"
      icon="Dot"
      size={getRadioIconSize(size)}
      {...props}
    />
  );
};

export default Radio;
