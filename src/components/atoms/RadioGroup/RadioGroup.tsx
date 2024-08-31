import React, { FormEvent, ReactNode, useState } from "react";
import * as PrimitiveRadioGroup from "@radix-ui/react-radio-group";

import "./_radioGroup.scss";

export interface RadioGroupProps {
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
  /** radio 그룹의 custom Children */
  children: ReactNode;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  disabled,
  required,
  name,
  loop,
  onChange,
  children,
}) => {
  const [selected, setSelected] = useState<RadioGroupProps["value"]>(value);

  const handleValueChange = (newValue: string) => {
    setSelected(newValue);
    if (onChange) onChange();
  };

  return (
    <PrimitiveRadioGroup.Root
      className="radio--group"
      value={selected}
      disabled={disabled}
      required={required}
      name={name}
      loop={loop}
      onValueChange={handleValueChange}
      asChild
    >
      {children}
    </PrimitiveRadioGroup.Root>
  );
};

export default RadioGroup;
