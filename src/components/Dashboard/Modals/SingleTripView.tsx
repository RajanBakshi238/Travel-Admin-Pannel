import { Carousel } from 'react-responsive-carousel';
import * as Yup from 'yup';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./style.scss"
import { IGetTripResponse } from '../../../contracts/IGetTripResponse';
import RenderContent from '../../Authentication/RenderContent';
import { USER } from '../../../contracts/constants/roleConstant';

import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import Input from '../../common/FormElements/Input';
import CustomError from '../../common/FormElements/CustomError';
import classNames from 'classnames';
import { useCreateReviewMutation } from '../../../redux/services/review';
import { ICanCreateReviewResponse } from '../../../contracts/ICanCreateReviewResponse';
import { IGetReviewOfTripResponse } from '../../../contracts/IGetReviewOfTripResponse';

const RatingValue: { [key: number]: string } = {
    0: 'Terrible',
    1: 'Poor',
    2: 'Average',
    3: 'Good',
    4: 'Excellent'
}

const SingleTripView = ({ trip, handleShowBooking, handleClose, canCreateReview, reviewData }:
    {
        trip: IGetTripResponse,
        canCreateReview: ICanCreateReviewResponse | undefined
        reviewData: IGetReviewOfTripResponse | undefined,
        handleShowBooking: any,
        handleClose: any
    }) => {
    const [initialValues, setInitialValues] = useState({ rating: 0, title: "", comment: "" })

    const [createReview] = useCreateReviewMutation()

    const handleBookTrip = () => {
        if (trip.leftSeats == 0) {
            toast("No seats left", {
                type: "error",
                theme: "colored"
            })
            return
        }

        handleShowBooking()
        handleClose();
    }

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object().shape({
            title: Yup.string().min(3, "Minimum 10 characters").required("Title is required"),
            comment: Yup.string().min(20, "Minimum 20 characters").required("Comment is required")
        }),
        onSubmit: async (values, { resetForm }) => {
            createReview({
                ...values,
                tripId: trip._id
            }).unwrap().then((response) => {
                toast(response.message ?? "Trip updated successfully .", {
                    type: "success",
                    theme: "colored"
                })
                console.log(response, ">>>>>>>>>>")
                resetForm();
            }).catch((error) => {
                toast(error?.message ?? "Something went  wrong ..", {
                    type: "error",
                    theme: "colored"
                })
            })
        }
    })

    const { setFieldValue, values, handleChange, handleBlur } = formik;

    return (
        <>
            <div className="single-trip-view-modal">

                <div className="itinerary-c">
                    <h1 className="trip-heading">Image Gallery</h1>
                    <div className=" image-carousel">

                        <Carousel showThumbs={false} dynamicHeight={false} >
                            {trip?.photos?.map((photo, index) => {
                                return <div key={index}>
                                    <img src={`${import.meta.env.VITE_BACKEND_URL}${photo?.path}`} alt="trip" />
                                </div>
                            })}
                        </Carousel>
                    </div>
                </div>
                <div className="itinerary-c">
                    <h1 className="trip-heading exclusion-heading">Itinerary</h1>
                    <div className="itinerary-road-map">
                        <div className="bus-top">
                            <i className="fas fa-bus"></i>
                        </div>
                        {trip?.itinerary?.map((itiner, index) => {
                            return <div className="itinerary-map-item" key={index}>
                                <div className="left-item">
                                    Day {itiner?.day}
                                </div>
                                <div className="right-item">
                                    {itiner?.description?.[0]}
                                </div>
                            </div>
                        })}


                        <div className="bus-top bottom">
                            <i className="fas fa-bus"></i>
                        </div>
                    </div>
                </div>
                <div className="itinerary-c day-page-detail">
                    {
                        trip?.itinerary?.map((itiner, index) => {
                            return <div key={index}>
                                <h1 className="trip-heading exclusion-heading">Day {itiner?.day}</h1>
                                <div className="inclusions">
                                    <ul>
                                        {itiner?.description?.map((desc, idx) => {
                                            return <li key={idx}>{desc}</li>
                                        })}

                                    </ul>
                                </div>
                            </div>

                        })
                    }
                </div>
                <div className="itinerary-c">
                    <h1 className="trip-heading exclusion-heading">Inclusions</h1>
                    <div className="inclusions">
                        <ul>
                            {trip?.inclusions?.map((inclusion, index) => {
                                return <li key={index}>{inclusion}</li>
                            })}
                        </ul>
                    </div>

                    <h1 className="exclusion-heading trip-heading">Exclusions</h1>
                    <div className="exclusions">
                        {trip?.exclusions?.map((exclusion, index) => {
                            return <li key={index}>{exclusion}</li>
                        })}

                    </div>
                </div>
                <div className="itinerary-c">
                    <h1 className="trip-heading exclusion-heading">Terms and conditions</h1>
                    <div className="terms-conditions">
                        <ul>
                            {trip?.termsAndConditions?.map((term, index) => {
                                return <li key={index}>{term}</li>
                            })}

                        </ul>
                    </div>

                </div>
                <RenderContent authorizedRole={[USER]}>
                    <div className='book-trip-block'>
                        <button className='btn btn-primary' onClick={handleBookTrip}>Book trip</button>
                    </div>
                </RenderContent>

                {/* Review section */}
                <div className='review'>
                    <h1 className='heading'>Reviews</h1>
                    <div className='review-details'>
                        <div className='review-container-left'>
                            <div className='review-circle'>
                                <span className='score'>4.5</span>
                                <div>
                                    <span className="filled"></span>
                                    <span className="filled"></span>
                                    <span className="filled"></span>
                                    <span className="partially"></span>
                                    <span className="empty"></span>
                                </div>
                                <span>
                                    3 reviews
                                </span>
                            </div>
                            <div className='review-bars'>
                                <div>
                                    <span className='review-text'>Excellent</span>
                                    <div className='bar'></div>
                                    <span className='review-number'>0</span>
                                </div>
                                <div>
                                    <span className='review-text'>Good</span>
                                    <div className='bar'></div>
                                    <span className='review-number'>0</span>
                                </div>
                                <div>
                                    <span className='review-text'>Average</span>
                                    <div className='bar'></div>
                                    <span className='review-number'>0</span>
                                </div>
                                <div>
                                    <span className='review-text'>Poor</span>
                                    <div className='bar'></div>
                                    <span className='review-number'>0</span>
                                </div>
                                <div>
                                    <span className='review-text'>Terrible</span>
                                    <div className='bar'></div>
                                    <span className='review-number'>0</span>
                                </div>

                            </div>
                            {canCreateReview && canCreateReview?.data?.canCreate && !canCreateReview?.data?.review && <FormikProvider value={formik}>
                                <Form onSubmit={formik.handleSubmit}>
                                    <div className='write-review'>
                                        <h5>
                                            Write a review
                                        </h5>
                                        <div className='write-box'>
                                            <div className='ty-input'>
                                                <label>How would you rate your experience?</label>
                                                <div className='rating-input '>
                                                    {[0, 1, 2, 3, 4].map((circle, index) => {
                                                        return <React.Fragment key={index}>
                                                            <div onClick={() => setFieldValue('rating', circle)} className={classNames('empty', {
                                                                "filled": circle <= values.rating
                                                            })}></div>
                                                        </React.Fragment>
                                                    })}
                                                    <span>{RatingValue?.[values?.rating]}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <Input name="title" label="Title *" type="text" placeholder='Review title' />
                                                <CustomError name="title" />
                                            </div>
                                            <div>
                                                <div className='ty-input'>
                                                    <label>Description *</label>
                                                    <textarea
                                                        name="comment"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder='Review description'></textarea>
                                                    <CustomError name="comment" />

                                                </div>
                                            </div>
                                            <div className='review-submit'>
                                                <button type="submit" className='btn btn-primary'>Submit</button>
                                            </div>
                                        </div>

                                    </div>
                                </Form>
                            </FormikProvider>}
                        </div>
                        <div className='review-container-right'>
                            <div className='review-content'>
                                <div className='review-header'>
                                    <div className='symbol'>R</div>
                                    <div className='user-detail'>
                                        <span>Zarna gohil</span>
                                        <span>Aug,23</span>
                                    </div>
                                </div>
                                <div className='rating-circle'>
                                    <span className="filled"></span>
                                    <span className="filled"></span>
                                    <span className="filled"></span>
                                    <span className="partially"></span>
                                    <span className="empty"></span>
                                </div>
                                <div className='review-description'>
                                    <h5>Love himalayan frontiers</h5>
                                    <p>I haven't done just this spiti tour, I have been in other packages as well with himalayan frontiers ; they had an amazing staff ; who will make sure to provide you the best experience, safety (which is very important) and comfort. In this trip from our leader khem to driver and mechanic all were very active, especially khem was connecting with every one personally, they had provide us very comfortable stay, delicious food and other services.I'll prefer to go with this company again and again, and also I can suggest my people to take their experience from himalayan frontiers with full confidenc</p>
                                </div>
                            </div>
                            <div className='review-content'>
                                <div className='review-header'>
                                    <div className='symbol'>R</div>
                                    <div className='user-detail'>
                                        <span>Zarna gohil</span>
                                        <span>Aug,23</span>
                                    </div>
                                </div>
                                <div className='rating-circle'>
                                    <span className="filled"></span>
                                    <span className="filled"></span>
                                    <span className="filled"></span>
                                    <span className="partially"></span>
                                    <span className="empty"></span>
                                </div>
                                <div className='review-description'>
                                    <h5>Love himalayan frontiers</h5>
                                    <p>I haven't done just this spiti tour, I have been in other packages as well with himalayan frontiers ; they had an amazing staff ; who will make sure to provide you the best experience, safety (which is very important) and comfort. In this trip from our leader khem to driver and mechanic all were very active, especially khem was connecting with every one personally, they had provide us very comfortable stay, delicious food and other services.I'll prefer to go with this company again and again, and also I can suggest my people to take their experience from himalayan frontiers with full confidenc</p>
                                </div>
                            </div>
                            <div className='review-content'>
                                <div className='review-header'>
                                    <div className='symbol'>R</div>
                                    <div className='user-detail'>
                                        <span>Zarna gohil</span>
                                        <span>Aug,23</span>
                                    </div>
                                </div>
                                <div className='rating-circle'>
                                    <span className="filled"></span>
                                    <span className="filled"></span>
                                    <span className="filled"></span>
                                    <span className="partially"></span>
                                    <span className="empty"></span>
                                </div>
                                <div className='review-description'>
                                    <h5>Love himalayan frontiers</h5>
                                    <p>I haven't done just this spiti tour, I have been in other packages as well with himalayan frontiers ; they had an amazing staff ; who will make sure to provide you the best experience, safety (which is very important) and comfort. In this trip from our leader khem to driver and mechanic all were very active, especially khem was connecting with every one personally, they had provide us very comfortable stay, delicious food and other services.I'll prefer to go with this company again and again, and also I can suggest my people to take their experience from himalayan frontiers with full confidenc</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>



        </>
    )
}

export default SingleTripView