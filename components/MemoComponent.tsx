import React, { useState, useEffect } from 'react'

const MemoComponent = ({ boo }: { boo: boolean }) => {
  const [state, setState] = useState(false)
  useEffect(() => {
    return () => {
      console.log('unmount')
    }
  }, [])

  return (
    <>
      {console.log('render 2')}
      <input />
      {boo ? 'True' : 'False'}
      <button
        onClick={() => {
          setState(prev => !prev)
        }}
      >
        Click
      </button>
    </>
  )
}

// export default React.memo(MemoComponent, (prevProp, newProp) => {
//   console.log(prevProp, newProp)
//   return true;
// })

export default MemoComponent
