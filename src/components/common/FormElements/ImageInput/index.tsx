import React from 'react'
import classNames from 'classnames';
import "./style.scss"


import { useFormikContext } from 'formik';


interface IImageInput {
    name: string;
    label?: string;
    // type: string;
    className?: string,
    value?: string | number
}

const ImageInput: React.FC<IImageInput> = ({ name, label, className, value }) => {

    const { handleBlur, handleChange, values } = useFormikContext()
    console.log(values, ">>>valies")
    return (
        <div className={classNames(['ty-input', className])}>
            {!!label && <label>{label}</label>}
            <input type="file" onChange={handleChange} onBlur={handleBlur} name={name} value={value ?? (values as { [key: string]: string })?.[name]} />
        </div>
    )
}

export default ImageInput