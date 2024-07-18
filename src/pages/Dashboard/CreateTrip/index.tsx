import { useFormik, FormikProvider, Form as FormikForm, FieldArray } from 'formik'
import "./style.scss"
import { useCreateTripMutation } from "../../../redux/services/trip";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/common/FormElements/Input";
import { Iitinerary } from '../../../contracts/ICreateTripRequest';
import ImageInput from '../../../components/common/FormElements/ImageInput';
import { IFileResponse } from '../../../contracts/IFileResponse';

const CreateTrip = () => {

    const [createTrip] = useCreateTripMutation()

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            place: "",
            startDate: "",
            endDate: "",
            pickUp: "",
            termsAndConditions: [''],
            price: 0,
            inclusions: [''],
            exclusions: [''],
            enquiryNumber: "",
            itinerary: [{ day: 1, description: [''] }],
            photos: []
        },
        onSubmit: (values, { resetForm }) => {
            createTrip({ ...values, price: values.price as number, photos: values?.photos?.map((item: IFileResponse) => item.id) }).unwrap().then((response) => {
                console.log(response, ">>>>>>>>>>")
                resetForm();
                navigate('/dashboard/my-trip')
            }).catch((error) => {

            })
            console.log(values, "...... valuess")
        }
    })


    const { values } = formik
    return (
        <div className="register-as-page">
            <FormikProvider value={formik} >
                <FormikForm onSubmit={formik.handleSubmit}>
                    <div className="form-box">
                        <div>
                            <Input name="place" label="Place *" type="text" />
                        </div>
                        <div>
                            <Input name="pickUp" label="Pick Up *" type="text" />
                        </div>

                        <div>
                            <Input name="startDate" label="Start Date *" type="date" />
                        </div>
                        <div>
                            <Input name="endDate" label="End Date *" type="date" />
                        </div>
                        <div>
                            <Input name="enquiryNumber" label="Enquiry Number *" type="text" />
                        </div>
                        <div>
                            <Input name="price" label="Price *" type="text" />
                        </div>
                        <div>
                            <FieldArray
                                name="inclusions"
                                render={arrayHelpers => (
                                    <div>
                                        {values.inclusions && values.inclusions.length > 0 ? <>
                                            {values.inclusions.map((inclusion, index) => {
                                                return <div key={index} className="mb-3 dynamic-no-input">

                                                    <Input value={inclusion} className='w-70' name={`inclusions.${index}`} type="text" {...(index === 0 ? { label: "Inclusion" } : {})} />


                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-primary add-btn"
                                                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                    >
                                                        -
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-primary remove-btn"
                                                        type="button"
                                                        onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                            })}

                                        </> : <>
                                            <button className="btn btn-outline-primary" type="button" onClick={() => arrayHelpers.push('')}>
                                                Add a Inclusion
                                            </button>
                                        </>}

                                    </div>
                                )}
                            />
                        </div>
                        <div>
                            <FieldArray
                                name="exclusions"
                                render={arrayHelpers => (
                                    <div>
                                        {values.exclusions && values.exclusions.length > 0 ? <>
                                            {values.exclusions.map((exclusion, index) => {
                                                return <div key={index} className="mb-3 dynamic-no-input">
                                                    <Input value={exclusion} className='w-70' name={`exclusions.${index}`} type="text" {...(index === 0 ? { label: "Exclusion" } : {})} />

                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-primary add-btn"
                                                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                    >
                                                        -
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-primary remove-btn"
                                                        type="button"
                                                        onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                                    >
                                                        +
                                                    </button>
                                                </div >

                                            })}

                                        </> : <>
                                            <button className="btn btn-outline-primary" type="button" onClick={() => arrayHelpers.push('')}>
                                                Add a exclusions
                                            </button>
                                        </>}

                                    </div>
                                )}
                            />
                        </div>
                        <div>
                            <FieldArray
                                name="termsAndConditions"
                                render={arrayHelpers => (
                                    <div>
                                        {values.termsAndConditions && values.termsAndConditions.length > 0 ? <>
                                            {values.termsAndConditions.map((terms, index) => {
                                                return <div key={index} className="mb-3 dynamic-no-input">
                                                    <Input value={terms} className="w-70" name={`termsAndConditions.${index}`} type="text" {...(index === 0 ? { label: "Terms and conditions" } : {})} />

                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-primary add-btn"
                                                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                    >
                                                        -
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-primary remove-btn"
                                                        type="button"
                                                        onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                            })}

                                        </> : <>
                                            <button className="btn btn-outline-primary" type="button" onClick={() => arrayHelpers.push('')}>
                                                Add a termsAndConditions
                                            </button>
                                        </>}

                                    </div>
                                )}
                            />
                        </div>
                        <div>
                            <ImageInput name="photos" inputLabel='upload files' multiple={true} />
                        </div>
                        <div>
                            <FieldArray name="itinerary">
                                {({ push, form, remove }) => {
                                    return (
                                        <>
                                            {form.values.itinerary?.map((itinar: Iitinerary, index: number) => {
                                                return <div className='itinerary-block'>

                                                    {index === 0 && <div className='itinerary-label'><label >Itinerary</label>
                                                        <div>

                                                            <button
                                                                className="btn btn-outline-primary remove-btn"
                                                                type="button"
                                                                onClick={() => push({ day: 1, description: [''] })}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>}
                                                    <div className='itinerary-inner'>
                                                        {index !== 0 && <div className='remove-itinerary'>
                                                            <button
                                                                type="button"
                                                                className="btn add-btn"
                                                                onClick={() => remove(index)}
                                                            >
                                                                X
                                                            </button></div>}
                                                        <Input
                                                            type="text"
                                                            // className="w-70"
                                                            value={itinar.day}
                                                            name={`itinerary.${index}.day`}
                                                            // {...(index === 0 ? { label: "Day" } : {})}
                                                            label='Day'
                                                        />
                                                        <div >
                                                            <FieldArray
                                                                name={`itinerary.${index}.description`}
                                                                render={arrayHelpers => (<div>

                                                                    {form?.values?.itinerary?.[index]?.description && form?.values?.itinerary?.[index]?.description.length > 0 ? <>
                                                                        {form?.values?.itinerary?.[index]?.description.map((desc: string, descIndex: number) => {
                                                                            return <div className="mb-3 dynamic-no-input">

                                                                                <Input
                                                                                    value={desc}
                                                                                    type="text"
                                                                                    className="w-70"
                                                                                    name={`itinerary.${index}.description.${descIndex}`}
                                                                                    {...(descIndex === 0 ? { label: "Description" } : {})}
                                                                                />

                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-outline-primary add-btn"
                                                                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                                                >
                                                                                    -
                                                                                </button>
                                                                                <button
                                                                                    className="btn btn-outline-primary remove-btn"
                                                                                    type="button"
                                                                                    onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                                                                >
                                                                                    +
                                                                                </button>

                                                                            </div>
                                                                        })}
                                                                    </> : <></>}
                                                                </div>)}
                                                            />


                                                        </div>


                                                    </div>

                                                </div>
                                            })}


                                        </>
                                    );
                                }}
                            </FieldArray>
                        </div>



                    </div>
                    <div className="submit-box">
                        <button type="submit" className="btn btn-primary">
                            Create trip
                        </button>
                    </div>
                </FormikForm>
            </FormikProvider>
        </div>
    );
}

export default CreateTrip