import React from 'react'
import { BiSolidErrorAlt } from "react-icons/bi";


function FormError({children,className}) {
  return (
    <p className = {`${className} text-gray-400 text-xs font-sans flex items-center gap-1`} >
      <span className='text-red-500' ><BiSolidErrorAlt /></span>
      {children}
    </p>
  )
}

export default FormError
