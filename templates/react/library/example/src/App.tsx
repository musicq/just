import React, {useState} from 'react'
import {Button} from '{{libraryName}}'
import './style.scss'

export function App() {
  const [count, setCount] = useState(1)

  return (
    <div className="container">
      <div className="count">{count}</div>
      <Button onClick={() => setCount(count + 1)}>Click me</Button>
    </div>
  )
}
