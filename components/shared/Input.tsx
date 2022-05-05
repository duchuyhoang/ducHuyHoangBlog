import React from "react";

export interface IInputProps {
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input = ({ placeholder, value, onChange }: IInputProps) => {
  return (
    <>
      <input
        className="input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
