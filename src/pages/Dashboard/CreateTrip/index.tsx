import { useFormik, FormikProvider, Form as FormikForm, FieldArray } from 'formik'
import * as Yup from 'yup';
import "./style.scss"
import { useCreateTripMutation } from "../../../redux/services/trip";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/common/FormElements/Input";
import { Iitinerary } from '../../../contracts/ICreateTripRequest';
import ImageInput from '../../../components/common/FormElements/ImageInput';
import { IFileResponse } from '../../../contracts/IFileResponse';
import CustomError from '../../../components/common/FormElements/CustomError';

const CreateTrip = () => {

    const [createTrip] = useCreateTripMutation()

    const navigate = useNavigate()
    const validationSchema = Yup.object().shape({
        place: Yup.string().min(3, "Minimum 3 characters").required("Place is required").trim(),
        startDate: Yup.string().required("Start date is required."),
        endDate: Yup.string().required("End date is required."),
        pickUp: Yup.string().min(3, "Minimum 3 characters").required("Pickup is required").trim(),
        price: Yup.number().integer("Price must be number").required("Price is required"),
        enquiryNumber: Yup.number().required("Enquiry number is required"),
        inclusions: Yup.array(Yup.string().min(3, "Minimum 3 characters").required("Inclusion can't be empty")).min(1, "Minimum 1 inclusion is required.").required("Inclusion is required"),
        exclusions: Yup.array(Yup.string().required()).min(1, "Minimum 1 exclusion is required."),
        termsAndConditions: Yup.array(Yup.string().required()).min(1, "Minimum 1 term and condition is required."),
        photos: Yup.array().min(1, "Minimum 1 Photo is required.")

    })


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
        validationSchema,
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

    console.log(formik.errors, "errors")
    const { values } = formik
    return (
        <div className="register-as-page">
            <FormikProvider value={formik} >
                <FormikForm onSubmit={formik.handleSubmit}>
                    <div className="form-box">
                        <div>
                            <Input name="place" label="Place *" type="text" />
                            <CustomError name="place" />
                        </div>
                        <div>
                            <Input name="pickUp" label="Pick Up *" type="text" />
                            <CustomError name="pickUp" />

                        </div>

                        <div>
                            <Input name="startDate" label="Start Date *" type="date" />
                            <CustomError name="startDate" />

                        </div>
                        <div>
                            <Input name="endDate" label="End Date *" type="date" />
                            <CustomError name="endDate" />
                        </div>
                        <div>
                            <Input name="enquiryNumber" label="Enquiry Number *" type="text" />
                            <CustomError name="enquiryNumber" />
                        </div>
                        <div>
                            <Input name="price" label="Price *" type="text" />
                            <CustomError name="price" />
                        </div>
                        <div>
                            <FieldArray
                                name="inclusions"
                                render={arrayHelpers => (
                                    <div>
                                        {values.inclusions && values.inclusions.length > 0 ? <>
                                            {values.inclusions.map((inclusion, index) => {
                                                return <div key={index} className="mb-3 dynamic-no-input">

                                                    <div className='w-70'>
                                                        <Input value={inclusion} name={`inclusions.${index}`} type="text" {...(index === 0 ? { label: "Inclusion" } : {})} />
                                                        <CustomError name={`inclusions.${index}`} />
                                                    </div>
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
                            <CustomError name="inclusions" showError={!values.inclusions.length} />
                        </div>
                        <div>
                            <FieldArray
                                name="exclusions"
                                render={arrayHelpers => (
                                    <div>
                                        {values.exclusions && values.exclusions.length > 0 ? <>
                                            {values.exclusions.map((exclusion, index) => {
                                                return <div key={index} className="mb-3 dynamic-no-input">
                                                    <div className='w-70'>
                                                        <Input value={exclusion} name={`exclusions.${index}`} type="text" {...(index === 0 ? { label: "Exclusion" } : {})} />
                                                        <CustomError name={`inclusions.${index}`} />
                                                    </div>
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
                            <CustomError name="exclusions" showError={!values.exclusions.length} />

                        </div>
                        <div>
                            <FieldArray
                                name="termsAndConditions"
                                render={arrayHelpers => (
                                    <div>
                                        {values.termsAndConditions && values.termsAndConditions.length > 0 ? <>
                                            {values.termsAndConditions.map((terms, index) => {
                                                return <div key={index} className="mb-3 dynamic-no-input">

                                                    <div className="w-70">

                                                        <Input value={terms} name={`termsAndConditions.${index}`} type="text" {...(index === 0 ? { label: "Terms and conditions" } : {})} />
                                                        <CustomError name={`termsAndConditions.${index}`} />
                                                    </div>

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
                            <CustomError name="termsAndConditions" showError={!values.termsAndConditions.length} />

                        </div>
                        <div>
                            <ImageInput name="photos" inputLabel='upload files' multiple={true} />
                            <CustomError name="photos" />
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