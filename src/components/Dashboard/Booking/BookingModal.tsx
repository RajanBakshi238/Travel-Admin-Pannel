import React from "react";
import { Modal } from "react-bootstrap"
import "./style.scss"
import { FieldArray, FormikProvider, useFormik, Form as FormikForm } from "formik";
import Input from "../../common/FormElements/Input";
import { IGetTripResponse } from "../../../contracts/IGetTripResponse";
import { useCreateBookingMutation, useEvaluateBookingMutation } from "../../../redux/services/booking";

interface IBookingModal {
    show: boolean,
    handleClose: () => void,
    trip: IGetTripResponse
}



function loadScript(src: any) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}




const BookingModal: React.FC<IBookingModal> = ({ show, handleClose, trip }) => {

    const [createBooking, { isLoading }] = useCreateBookingMutation()
    const [evaluateBooking, {isLoading: evaluateLoading}] = useEvaluateBookingMutation()


    const formik = useFormik({
        initialValues: {
            users: [
                {
                    name: '',
                    email: '',
                    contactNumber: '',
                    age: '',
                }
            ],
            note: ""
        },
        onSubmit: async (values) => {
            try {

                console.log({ ...values, organizerId: trip.organizerId, tripId: trip._id }, ">>>>>> booking values")

                const res = await loadScript(
                    "https://checkout.razorpay.com/v1/checkout.js"
                );

                if (!res) {
                    alert("Razorpay SDK failed to load. Are you online?");
                    return;
                }

                const { data: { booking, order } } = await createBooking({ ...values, organizerId: trip.organizerId, tripId: trip._id }).unwrap()
                const { amount, id: order_id, currency } = order;
                const options = {
                    key: import.meta.env.VITE_RAZOR_KEY,
                    amount: amount,
                    currency: currency,
                    name: "TRAVEL YATRI",
                    order_id: order_id,
                    "handler": async function (response: any) {
                        const data = {
                            orderCreationId: order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature,
                            bookingId: booking._id
                        }
                        const evaluateResponse = await evaluateBooking(data).unwrap();
                        console.log(evaluateResponse)
                    },
                }
                const paymentObject = new window.Razorpay(options);

                paymentObject.open();

                // createBooking({ ...values, organizerId: trip.organizerId, tripId: trip._id }).unwrap().then((response) => {
                //     console.log(response, "<<<<<<<< create booking response")
                // }).catch((error) => {
                //     console.log(error, "<<<<<<<< create booking response")

                // })
            } catch (error) {

            }
        }
    })

    const { values } = formik;

    return (
        <Modal className="booking-modal pickup-place-modal" size="lg" show={show} onHide={handleClose} centered>
            <div className="modal-outer">
                <FormikProvider value={formik} >
                    <FormikForm onSubmit={formik.handleSubmit}>
                        <FieldArray name="users"
                            render={arrayHelpers => (<div>
                                {values.users.map((user, index) => {
                                    return <div key={index}>
                                        {index === 0 && <div className='user-label'><label >Users</label>
                                            <div>

                                                <button
                                                    className="btn btn-outline-primary remove-btn-user
                                                    
                                                    "
                                                    type="button"
                                                    onClick={() => arrayHelpers.push({ name: "", email: "", contactNumber: "", age: "" })}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>}
                                        <div className="user-details-fields">
                                            {index !== 0 && <div className='remove-user'>
                                                <button
                                                    type="button"
                                                    className="btn remove-btn"
                                                    onClick={() => arrayHelpers.remove(index)}
                                                >
                                                    X
                                                </button></div>}
                                            <Input name={`users.${index}.name`} type="text" label="Name" />
                                            <Input name={`users.${index}.email`} type="text" label="Email" />
                                            <Input name={`users.${index}.contactNumber`} type="text" label="Contact Number" />
                                            <Input name={`users.${index}.age`} type="text" label="Age" />
                                        </div>

                                    </div>
                                })}

                            </div>)}
                        />
                        <div className="booking-input">
                            <Input name="note" type="text" label="Notes (optional)" />
                        </div>

                        <div className="seprator"></div>

                        <div className="pricing-block">
                            <div className="pricing-detail">
                                <div>
                                    <label>No. of users </label>
                                    <h5>{values.users.length}</h5>
                                </div>
                                <div>
                                    <label>Cost per user</label>
                                    <h5>$ {trip?.price}</h5>
                                </div>

                                <div className="pricing-total">
                                    <label>Total: </label>
                                    <h5>$ {trip?.price * values.users.length}</h5>
                                </div>

                            </div>
                        </div>
                        <div className='book-trip-block'>
                            <button type="submit" className='btn btn-primary'>Checkout</button>
                        </div>

                    </FormikForm>
                </FormikProvider>

            </div>
        </Modal >
    )
}

export default BookingModal