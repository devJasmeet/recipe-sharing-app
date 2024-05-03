import React from 'react'

function Container({children}) {
  return (
    <div className=' w-full max-w-5xl mx-auto h-full'>
      {children}
    </div>
  )
}

export default Container
