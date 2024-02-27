import classNames from "classnames";
import React from "react";

interface IProps {
  className?: string;
  name: string;
  value: string;
  onChange(key: string, value: string): void;
  placeholder?: string;
  label?: string;
  type?: "text";
}

export default function Field({
  name,
  label,
  placeholder,
  value,
  onChange,
  className,
  type = "text",
}: IProps) {
  const handleChange = (e: any) => {
    const { value } = e.target;
    onChange(name, value);
  };

  return (
    <div className={classNames("field", className)}>
      {label && <label htmlFor={name}>{label}</label>}

      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        autoCapitalize="off"
      />
    </div>
  );
}
