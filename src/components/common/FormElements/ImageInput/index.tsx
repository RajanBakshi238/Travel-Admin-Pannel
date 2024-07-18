import React from 'react'
import classNames from 'classnames';
import "./style.scss"


import { useFormikContext } from 'formik';
import { useUploadFileMutation } from '../../../../redux/services/file';
import { IFileResponse } from '../../../../contracts/IFileResponse';


interface IImageInput {
    name: string;
    label?: string;
    // type: string;
    className?: string,
    value?: string | number,
    inputLabel: string;
    multiple?: boolean
}

const ImageInput: React.FC<IImageInput> = ({ name, label, className, value, inputLabel, multiple = false }) => {
    const [uploadFile] = useUploadFileMutation()

    const { handleBlur, setFieldValue, values } = useFormikContext()
    console.log(values, ">>>valies")
    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            uploadFile({ file: e.target.files[0] }).unwrap().then((res) => {
                console.log(res, "?>>>>>>>>>> file uplokad response")
                if (multiple) {
                    setFieldValue(name, [...((values as { [key: string]: string })?.[name]), res])
                } else {
                    setFieldValue(name, res)

                }

            }).catch((err) => {
                console.log(err, ">>>>> err of file upload ")
            })
        }
    }

    const handleRemove = (id: string) => {
        setFieldValue(name, ((values as any)?.[name])?.filter((item: IFileResponse) => item.id != id))
    }


    return (
        <div className={classNames(['ty-input ty-image-input', className])}>
            {!!label && <label>{label}</label>}
            <div className='custom-image'>
                <label htmlFor='ty-image-upload' className='btn btn-primary'>{inputLabel}</label>
            </div>
            <input id="ty-image-upload" hidden type="file" onChange={handleUpload} onBlur={handleBlur} name={name} />
            <div className='image-list'>
                {multiple ?
                    <>{((values as { [key: string]: string | [] })?.[name] as [])?.map((item: IFileResponse, index: number) => {
                        return <>

                            <div key={index}>
                                <div className='cut' onClick={() => handleRemove(item.id)}>X</div>
                                <img className='uploaded-img' src={`http://localhost:3005/${item.path}`} />
                            </div>
                        </>
                    })}</>
                    : <>
                        <div>
                            <div className='cut' onClick={() => setFieldValue(name, null)}>X</div>
                            <img className='uploaded-img' src={`http://localhost:3005/${(values as any)?.[name]?.path}`} />
                        </div>
                    </>
                }



            </div>

        </div>
    )
}

export default ImageInput