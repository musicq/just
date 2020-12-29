import React, {PropsWithChildren} from 'react'

interface ButtonProps {
  onClick: () => void,
}

export function Button({onClick, children}: PropsWithChildren<ButtonProps>) {
  return (
    <button onClick={onClick}>{children}</button>
  )
}