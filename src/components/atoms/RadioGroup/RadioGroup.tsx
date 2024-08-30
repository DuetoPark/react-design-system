import React, { FormEvent, useEffect, useState } from "react";
import * as PrimitiveRadioGroup from "@radix-ui/react-radio-group";

import "./_radioGroup.scss";

import Radio from "./Radio";
import { RadioItemProps } from "./Radio/Radio";

export interface RadioGroupProps {
  /** radio items 데이터 */
  items: RadioItemProps[];
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
  /** radio 크기 */
  size?: RadioItemProps["size"];
  /** radio 이벤트 */
  onChange?: (e?: FormEvent<HTMLInputElement>) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  items,
  value,
  disabled,
  required,
  name,
  loop,
  size = "normal",
  onChange,
}) => {
  const [selected, setSelected] = useState<RadioGroupProps["value"]>(value);

  useEffect(() => {
    if (!selected && items.length > 0) {
      setSelected(items[0].value);
    }
  }, [selected, items]);

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
    >
      {items.length > 0 &&
        items.map(({ id, value, text }) => (
          <div key={id} className="radio--item">
            <Radio
              id={id}
              className="radio--item-radio"
              value={value}
              disabled={disabled}
              size={size}
            />

            <label className="radio--item-text" htmlFor={id}>
              {text}
            </label>
          </div>
        ))}
    </PrimitiveRadioGroup.Root>
  );
};

export default RadioGroup;
