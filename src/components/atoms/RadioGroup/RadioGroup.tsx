import React, { FormEvent, PropsWithChildren, useState } from "react";
import * as PrimitiveRadioGroup from "@radix-ui/react-radio-group";
import classNames from "classnames";

import "./_radioGroup.scss";

export interface RadioGroupProps extends PropsWithChildren {
  /** radio group 값 */
  value?: string;
  /** radio 상호작용 */
  disabled?: boolean;
  /** radio 필수 항목 */
  required?: boolean;
  /** radio name */
  name: string;
  /** 키보드 탐색 */
  loop?: boolean;
  /** radio 이벤트 */
  onChange?: (e?: FormEvent<HTMLInputElement>) => void;
  /** radio group의 클래스명 */
  className?: undefined;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  disabled,
  required,
  name,
  loop,
  onChange,
  children,
  className,
}) => {
  const [selected, setSelected] = useState<RadioGroupProps["value"]>(value);

  const handleValueChange = (newValue: string) => {
    setSelected(newValue);
    if (onChange) onChange();
  };

  return (
    <PrimitiveRadioGroup.Root
      className={classNames("radio--group", className)}
      value={selected}
      disabled={disabled}
      required={required}
      name={name}
      loop={loop}
      onValueChange={handleValueChange}
      asChild
    >
      <>{children}</>
    </PrimitiveRadioGroup.Root>
  );
};

export default RadioGroup;
