import React, { useId } from 'react'

const Input = React.forwardRef(
    function Input({
        label,
        type = "text",
        className = '',
        ...props
    } , ref )
    {
        const id = useId()
        return (
            <div className='flex flex-col pt-4 pb-1'>
                {
                    label && <label htmlFor={id} className='text-sm font-semibold  ' >{label} :</label>
                }
                <input 
                    type = {type}
                    className = {`${className} p-0.5 border-b border-black/10`}
                    ref = {ref}
                    {...props}
                    id={id}
                />
            </div>
        )
    }
)

export default Input
