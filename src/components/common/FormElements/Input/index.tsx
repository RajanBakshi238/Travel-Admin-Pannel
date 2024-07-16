import React from 'react'
import "./style.scss"

import { useFormikContext } from 'formik';

interface IInput {
    name: string;
    label: string;
    type: string;
}

const Input: React.FC<IInput> = ({ name, label, type }) => {

    const { handleBlur, handleChange, values } = useFormikContext()
    return (
        <div className='ty-input'>
            <label>{label}</label>
            <input onChange={handleChange} onBlur={handleBlur} name={name} type={type} value={(values as { [key: string]: string })?.[name]} />
        </div>
    )
}

export default Input