import React, { useId } from 'react'

function Select({
    options,
    label,
    className,
    ...props
    },ref) {
        const id = useId()
        return (
            <div  className='flex flex-wrap items-center ' >
                { label && <label htmlFor={id} className='pr-4 text-sm font-semibold ' >{label} :</label>}
                <select
                    {...props}
                    id = {id}
                    ref={ref}
                    className={`${className} rounded-md border border-gray/10 p-1 bg-gray-300 font-light `}
                >
                    {
                        options.map((option) => (
                            <option key={option} value={option} selected={option == "Active"} >{option}</option>
                        ))
                    }
                </select>
            </div>
        )
    }

export default React.forwardRef(Select)