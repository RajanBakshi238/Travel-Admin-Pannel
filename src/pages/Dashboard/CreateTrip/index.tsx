import { Form, InputGroup } from "react-bootstrap";
import { useFormik, FormikProvider, Form as FormikForm, FieldArray } from 'formik'
import "./style.scss"

const CreateTrip = () => {

    const formik = useFormik({
        initialValues: {
            place: "",
            startDate: "",
            endDate: "",
            pickup: "",
            termsAndConditions: [''],
            price: null,
            inclusions: [''],
            exclusions: [''],
            itinerary: [{ day: 1, description: [] }]
        },
        onSubmit: (values) => {
            console.log(values, "...... valuess")
        }
    })


    const { handleChange, handleBlur, values } = formik
    console.log(values, "........")
    return (
        <div className="register-as-page">
            <FormikProvider value={formik} >
                <FormikForm onSubmit={formik.handleSubmit}>
                    <div className="form-box">
                        <div>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><i className="fas fa-map-marker-alt"></i></InputGroup.Text>
                                <Form.Control
                                    name="place"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Place"
                                    aria-label="Place"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><i className="fas fa-truck-pickup"></i></InputGroup.Text>
                                <Form.Control
                                    name="pickup"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Pick up"
                                    aria-label="pick up"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>

                        <div>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><i className="fas fa-calendar-week"></i></InputGroup.Text>
                                <Form.Control
                                    name="startDate"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="date"
                                    placeholder="Start Date"
                                    aria-label="start date"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><i className="fas fa-calendar-week"></i></InputGroup.Text>
                                <Form.Control
                                    name="endDate"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="date"
                                    placeholder="End Date"
                                    aria-label="End date"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><i className="fas fa-phone-volume"></i></InputGroup.Text>
                                <Form.Control
                                    name="enquiryNumber"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enquiry Number"
                                    aria-label="pick up"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><i className="fas fa-dollar-sign"></i></InputGroup.Text>
                                <Form.Control
                                    name="price"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Price"
                                    aria-label="pick up"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div>
                            <FieldArray
                                name="inclusions"
                                render={arrayHelpers => (
                                    <div>
                                        {values.inclusions && values.inclusions.length > 0 ? <>
                                            {values.inclusions.map((inclusion, index) => {
                                                return <InputGroup key={index} className="mb-3 dynamic-no-input">
                                                    {/* <InputGroup.Text id="basic-addon1"><i className="fas fa-dollar-sign"></i></InputGroup.Text> */}
                                                    <Form.Control
                                                        name={`inclusions.${index}`}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Inclusion"
                                                        aria-label="pick up"
                                                        aria-describedby="basic-addon1"
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
                                                </InputGroup>

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
                                                return <InputGroup key={index} className="mb-3 dynamic-no-input">
                                                    {/* <InputGroup.Text id="basic-addon1"><i className="fas fa-dollar-sign"></i></InputGroup.Text> */}
                                                    <Form.Control
                                                        name={`exclusions.${index}`}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Exclusion"
                                                        aria-label="pick up"
                                                        aria-describedby="basic-addon1"
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
                                                </InputGroup>

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
                                                return <InputGroup key={index} className="mb-3 dynamic-no-input">
                                                    {/* <InputGroup.Text id="basic-addon1"><i className="fas fa-dollar-sign"></i></InputGroup.Text> */}
                                                    <Form.Control
                                                        name={`termsAndConditions.${index}`}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Terms and conditions"
                                                        aria-label="pick up"
                                                        aria-describedby="basic-addon1"
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
                                                </InputGroup>

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

                    </div>
                    <div className="submit-box">
                        <button className="btn btn-primary">
                            Create trip
                        </button>
                    </div>
                </FormikForm>
            </FormikProvider>
        </div>
    );
}

export default CreateTrip