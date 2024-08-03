import { FormikProvider, useFormik, Form as FormikForm } from "formik"
import * as Yup from 'yup';
import Input from "../../../components/common/FormElements/Input"
import ImageInput from "../../../components/common/FormElements/ImageInput"
import { useOrganizerFormMutation } from "../../../redux/services/organizer"
// import { useState } from "react"

import "./style.scss"
import classNames from "classnames"
import { useUserContext } from "../../../context/User"
import CustomError from "../../../components/common/FormElements/CustomError";

const OrganizerPersonalForm = () => {

    const { user } = useUserContext()
    const underVerification = user?.isVerificationSubmitted
    const [organizerForm] = useOrganizerFormMutation();

    const validationSchema = Yup.object().shape({
        agencyName: Yup.string().required("Agency name is required").trim(),
        email: Yup.string().email("Enter valid email").required("Agency name is required").trim(),
        address: Yup.string().required("Addressnis required").trim(),
        website: Yup.string().required("Website is required").trim(),
        contactNumber: Yup.string()
            .matches(/^\d+$/, 'Invalid contact number').required("Contact number is required"),
        dialCode: Yup.string().required("Dial code is required"),
        aadhaarNumber: Yup.string()
            .matches(/^\d+$/, 'Invalid addhar number').required("Addhaar number is required"),
        panNumber: Yup.string().required("Pancard is required"),
        gstNumber: Yup.string().required("GST number is required"),
        description: Yup.string().required("Description is required"),
        adhaarImage: Yup.object({
            path: Yup.string(),
            id: Yup.string()
        }).test('adhar-check', 'Adhaar Image required', value => !!value && !!value.path && !!value.id),
        panImage: Yup.object({
            path: Yup.string(),
            id: Yup.string()
        }).test('pan-check', 'Pancard Image required', value => !!value && !!value.path && !!value.id)

    })


    const formik = useFormik({
        initialValues: {
            agencyName: "",
            email: "",
            address: "",
            website: "",
            contactNumber: "",
            dialCode: "",
            aadhaarNumber: "",
            panNumber: "",
            gstNumber: "",
            adhaarImage: { path: "", id: "" },
            panImage: { path: "", id: "" },
            description: ""
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            organizerForm({ ...values, adhaarImage: values?.adhaarImage?.id, panImage: values?.panImage?.id }).unwrap().then(() => {
                resetForm();
                // setUnderVerification(true)
            }).catch(() => {

            })
        }
    })

    console.log(formik.errors, ".... errors")

    return <>
        <div className={classNames("register-as-page ", {
            "organizer-verification": underVerification
        })}>

            {underVerification ? <>
                <div className="under-verification">
                    <h1>Please wait some time</h1>
                    <p>Your application is under review once admin approves you can start your travel yatri journey as an  organizer.</p>
                </div>

            </> :

                <FormikProvider value={formik} >
                    <FormikForm onSubmit={formik.handleSubmit}>
                        <div className="form-box">
                            <div>
                                <Input name="agencyName" label="Agency Name *" type="text" />
                                <CustomError name="agencyName" />

                            </div>
                            <div>
                                <Input name="email" label="Email *" type="text" />
                                <CustomError name="email" />
                            </div>
                            <div>
                                <Input name="address" label="Address *" type="text" />
                                <CustomError name="address" />
                            </div>
                            <div>
                                <Input name="website" label="Website *" type="text" />
                                <CustomError name="website" />
                            </div>
                            <div>
                                <Input name="dialCode" label="Dial Code *" type="text" />
                                <CustomError name="dialCode" />
                            </div>
                            <div>
                                <Input name="contactNumber" label="Contact Number *" type="text" />
                                <CustomError name="contactNumber" />
                            </div>
                            <div>
                                <Input name="aadhaarNumber" label="Aadhaar Number *" type="text" />
                                <CustomError name="aadhaarNumber" />
                            </div>
                            <div>
                                <Input name="panNumber" label="Pan Number *" type="text" />
                                <CustomError name="panNumber" />
                            </div>
                            <div>
                                <Input name="gstNumber" label="Gst Number *" type="text" />
                                <CustomError name="gstNumber" />
                            </div>
                            <div>
                                <ImageInput name="adhaarImage" inputLabel='upload Aadhaar' />
                                <CustomError name="adhaarImage" />
                            </div>
                            <div>
                                <ImageInput name="panImage" inputLabel='upload Pan card' />
                                <CustomError name="panImage" />
                            </div>
                            <div>
                                <Input name="description" label="Description *" type="text" />
                                <CustomError name="description" /> 
                            </div>
                        </div>
                        <div className="submit-box">

                            <button type="submit" className="btn btn-primary">
                                Submit For Verification
                            </button>
                        </div>
                    </FormikForm>
                </FormikProvider>
            }
        </div>
    </>
}

export default OrganizerPersonalForm