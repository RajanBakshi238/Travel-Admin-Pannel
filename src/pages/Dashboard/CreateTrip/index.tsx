import { useFormik, FormikProvider, Form as FormikForm, FieldArray } from 'formik'
import * as Yup from 'yup';
import "./style.scss"
import { useCreateTripMutation, useEditTripMutation, useGetTripByIdQuery } from "../../../redux/services/trip";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../components/common/FormElements/Input";
import { Iitinerary } from '../../../contracts/ICreateTripRequest';
import ImageInput from '../../../components/common/FormElements/ImageInput';
import { IFileResponse } from '../../../contracts/IFileResponse';
import CustomError from '../../../components/common/FormElements/CustomError';
// import MapTest from './MapTest';

import SelectPickup from './SelectPickup';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

const CreateTrip = () => {

    const { id } = useParams()
    const skip = id == null;
    const { data } = useGetTripByIdQuery({ id: id as string }, { skip })
    const [initialValues, setInitialValues] = useState({
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
        photos: [],
        pickUpPointLong: "",
        pickUpPointLat: "",
        totalSeats: ''
    })
    const [createTrip] = useCreateTripMutation()
    const [editTrip] = useEditTripMutation()
    const navigate = useNavigate()
    const validationSchema = Yup.object().shape({
        place: Yup.string().min(3, "Minimum 3 characters").required("Place is required").trim(),
        pickUpPointLat: Yup.string()
            .matches(/^-?\d*\.?\d+$/, 'Invalid Latitude')
            .required('Latitude is required'),
        pickUpPointLong: Yup.string()
            .matches(/^-?\d*\.?\d+$/, 'Invalid Longitude')
            .required('Longitude is required'),
        totalSeats: Yup.string()
            .matches(/^\d+$/, 'Invalid total seats').required("Total seats is required"),
        // leftSeats: Yup.string()
        //     .matches(/^\d+$/, 'Invalid left seats').required("Left seats is required"),
        // pickUpPointLat: Yup.number()
        //     .typeError('Latitude must be a number')
        //     .required('Latitude is required'),
        // pickUpPointLong: Yup.number()
        //     .typeError('Longitude must be a number')
        //     .required('Longitude is required'),
        startDate: Yup.string().required("Start date is required."),
        endDate: Yup.string().required("End date is required."),
        pickUp: Yup.string().min(3, "Minimum 3 characters").required("Pickup is required").trim(),
        price: Yup.number().integer("Price must be number").required("Price is required"),
        enquiryNumber: Yup.number().required("Enquiry number is required"),
        inclusions: Yup.array(Yup.string().min(3, "Minimum 3 characters").required("Inclusion can't be empty")).min(1, "Minimum 1 inclusion is required.").required("Inclusion is required"),
        exclusions: Yup.array(Yup.string().required("Exclusion can't be empty")).min(1, "Minimum 1 exclusion is required."),
        termsAndConditions: Yup.array(Yup.string().required("Terms and condition can't be empty")).min(1, "Minimum 1 term and condition is required."),
        photos: Yup.array().min(1, "Minimum 1 Photo is required.").max(6, "Maximum 6 photos can be uploaded"),
        itinerary: Yup.array(
            Yup.object().shape({
                day: Yup.string().required("Day can't be empty"),
                description: Yup.array(Yup.string().required("Itinerary description is required.")).min(1, "Minimum 1 itinerary description is required.")
            })
        ).min(1, "One itinerary is required.")
    })


    console.log(data, ">>>>> data")



    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            if (id) {
                editTrip({
                    ...values,
                    _id: id,
                    totalSeats: +values.totalSeats,
                    price: values.price as number,
                    pickUpPointLat: +values.pickUpPointLat,
                    pickUpPointLong: +values.pickUpPointLong,
                    photos: values?.photos?.map((item: IFileResponse) => item.id)
                }).unwrap().then((response) => {
                    toast(response.message ?? "Trip updated successfully .", {
                        type: "success",
                        theme: "colored"
                    })
                    console.log(response, ">>>>>>>>>>")
                    resetForm();
                    navigate('/dashboard/all-trip')
                }).catch((error) => {
                    toast(error?.message ?? "Something went  wrong ..", {
                        type: "error",
                        theme: "colored"
                    })
                })
            } else {


                createTrip({
                    ...values,
                    totalSeats: +values.totalSeats,
                    price: values.price as number,
                    pickUpPointLat: +values.pickUpPointLat,
                    pickUpPointLong: +values.pickUpPointLong,
                    photos: values?.photos?.map((item: IFileResponse) => item.id)
                }).unwrap().then((response) => {
                    toast(response.message ?? "Trip created successfully .", {
                        type: "success",
                        theme: "colored"
                    })
                    console.log(response, ">>>>>>>>>>")
                    resetForm();
                    navigate('/dashboard/all-trip')
                }).catch((error) => {
                    toast(error?.message ?? "Something went  wrong ..", {
                        type: "error",
                        theme: "colored"
                    })
                })
            }

            console.log(values, "...... valuess")
        }
    })


    useEffect(() => {
        if (data) {
            setInitialValues({
                ...initialValues,
                place: data.place,
                pickUp: data.pickUp,
                startDate: format(data.startDate, "yyyy-MM-dd"),
                endDate: format(data.endDate, "yyyy-MM-dd"),
                termsAndConditions: data.termsAndConditions,
                price: data.price,
                inclusions: data.inclusions,
                exclusions: data.exclusions,
                enquiryNumber: data.enquiryNumber,
                itinerary: data.itinerary,
                pickUpPointLong: data.pickUpPointLong + "",
                pickUpPointLat: data.pickUpPointLat + "",
                totalSeats: data.totalSeats + "",
                //@ts-ignore
                photos: data?.photos?.map((photo) => ({ ...photo, id: photo._id }))

            })
        }
    }, [data])


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
                            <SelectPickup />
                            <CustomError name="pickUp" />

                        </div>
                        {/* <div>
                            <Input name="pickUp" label="Pick Up *" type="text" />
                            <CustomError name="pickUp" />

                        </div> */}
                        <div>
                            <Input name="totalSeats" label="Total Seats *" type="text" />
                            <CustomError name="totalSeats" />

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
                                                        <CustomError name={`itinerary.${index}.day`} />

                                                        <div >
                                                            <FieldArray
                                                                name={`itinerary.${index}.description`}
                                                                render={arrayHelpers => (<div>

                                                                    {form?.values?.itinerary?.[index]?.description && form?.values?.itinerary?.[index]?.description.length > 0 ? <>
                                                                        {form?.values?.itinerary?.[index]?.description.map((desc: string, descIndex: number) => {
                                                                            return <div className="mb-3 dynamic-no-input">

                                                                                <div className="w-70">
                                                                                    <Input
                                                                                        value={desc}
                                                                                        type="text"
                                                                                        className=""
                                                                                        name={`itinerary.${index}.description.${descIndex}`}
                                                                                        {...(descIndex === 0 ? { label: "Description" } : {})}
                                                                                    />
                                                                                    <CustomError name={`itinerary.${index}.description.${descIndex}`} />
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
                            <CustomError name="itinerary" showError={!values.itinerary.length} />

                        </div>



                    </div>
                    <div className="submit-box">
                        <button type="submit" className="btn btn-primary">
                            {id ? "Update Trip" : "Create trip"}
                        </button>
                    </div>
                </FormikForm>
            </FormikProvider>

            {/* 
            <h1>Create Trip Map</h1>
            <MapTest /> */}




        </div>
    );
}

export default CreateTrip