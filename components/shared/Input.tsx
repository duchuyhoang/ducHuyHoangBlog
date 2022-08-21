import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface IInputProps {
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

const Input = ({
  placeholder,
  value,
  onChange,
  inputProps = {},
}: IInputProps) => {
  return (
    <>
      <input
        className="input"
        type="text"
        {...inputProps}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
