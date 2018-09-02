import * as React from 'react'

interface IProps {
  type: 'text' | 'password'
  label: string
  value: string
  placeholder: string
  onChangeText: React.ChangeEventHandler
}

const Input = ({ type, label, value, placeholder, onChangeText }: IProps) => {
  return (
    <label>
      <span>{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChangeText}
      />
    </label>
  )
}

export default Input
