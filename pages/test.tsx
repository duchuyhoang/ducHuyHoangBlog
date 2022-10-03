import React, { useState } from 'react'
import ClassComponent from '../components/ClassComponent'
import MemoComponent from '../components/MemoComponent'

const Test = () => {
  const [state, setState] = useState(false)
  const [state2, setState2] = useState("vvvv")

  return (
    <>
      {console.log('render 1')}
      <MemoComponent boo={state} key={state2}/>
      {/* <ClassComponent boo={state} /> */}
      <button
        onClick={() => {
          setState(prev => !prev)
        }}
      >
        Nhan
      </button>
      <button
        onClick={() => {
          setState2("key change")
        }}
      >
        Nhan 2
      </button>
    </>
  )
}

export default Test
