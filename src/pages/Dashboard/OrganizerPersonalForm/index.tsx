import { FormikProvider, useFormik, Form as FormikForm } from "formik"
import Input from "../../../components/common/FormElements/Input"
import ImageInput from "../../../components/common/FormElements/ImageInput"
import { useOrganizerFormMutation } from "../../../redux/services/organizer"
import { useState } from "react"

import "./style.scss"
import classNames from "classnames"

const OrganizerPersonalForm = () => {

    const [underVerification, setUnderVerification] = useState(false)
    const [organizerForm] = useOrganizerFormMutation();

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
        onSubmit: (values, { resetForm }) => {
            organizerForm({ ...values, adhaarImage: values?.adhaarImage?.id, panImage: values?.panImage?.id }).unwrap().then(() => {
                resetForm();
                setUnderVerification(true)
            }).catch(() => {

            })
        }
    })

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
                            </div>
                            <div>
                                <Input name="email" label="Email *" type="text" />
                            </div>
                            <div>
                                <Input name="address" label="Address *" type="text" />
                            </div>
                            <div>
                                <Input name="website" label="Website *" type="text" />
                            </div>
                            <div>
                                <Input name="dialCode" label="Dial Code *" type="text" />
                            </div>
                            <div>
                                <Input name="contactNumber" label="Contact Number *" type="text" />
                            </div>
                            <div>
                                <Input name="aadhaarNumber" label="Aadhaar Number *" type="text" />
                            </div>
                            <div>
                                <Input name="panNumber" label="Pan Number *" type="text" />
                            </div>
                            <div>
                                <Input name="gstNumber" label="Gst Number *" type="text" />
                            </div>
                            <div>
                                <ImageInput name="adhaarImage" inputLabel='upload Aadhaar' />

                            </div>
                            <div>
                                <ImageInput name="panImage" inputLabel='upload Pan card' />

                            </div>
                            <div>
                                <Input name="description" label="Description *" type="text" />
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