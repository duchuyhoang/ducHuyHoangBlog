import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value: any
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const Input = ({ placeholder, value, onChange, ...rest }: IInputProps) => {
  return (
    <>
      <input
        className="input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </>
  )
}

export default Input
