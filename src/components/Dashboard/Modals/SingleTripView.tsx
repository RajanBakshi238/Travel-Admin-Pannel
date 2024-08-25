import { Carousel } from 'react-responsive-carousel';
import * as Yup from 'yup';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./style.scss"
import { IGetTripResponse } from '../../../contracts/IGetTripResponse';
import RenderContent from '../../Authentication/RenderContent';
import { USER } from '../../../contracts/constants/roleConstant';

import { toast } from 'react-toastify';
import React, { useMemo, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import Input from '../../common/FormElements/Input';
import CustomError from '../../common/FormElements/CustomError';
import classNames from 'classnames';
import { useCreateReviewMutation } from '../../../redux/services/review';
import { ICanCreateReviewResponse, IReview } from '../../../contracts/ICanCreateReviewResponse';
import { IGetReviewOfTripResponse } from '../../../contracts/IGetReviewOfTripResponse';
import { format } from 'date-fns';

const RatingValue: { [key: number]: string } = {
    1: 'Terrible',
    2: 'Poor',
    3: 'Average',
    4: 'Good',
    5: 'Excellent'
}

const getCircleStyle = (index: number, score: number) => {
    // Determine if the circle should be fully or partially filled
    if (index + 1 <= Math.floor(score)) {
        return 'filled'; // Fully filled
    } else if (index < score) {
        return 'partially'; // Partially filled
    }

    return ''
    // else {
    //     return 'empty'; // Empty circle
    // }
};


const SingleTripView = ({ trip, handleShowBooking, handleClose, canCreateReview, reviewData }:
    {
        trip: IGetTripResponse,
        canCreateReview: ICanCreateReviewResponse | undefined
        reviewData: IGetReviewOfTripResponse | undefined,
        handleShowBooking: any,
        handleClose: any
    }) => {
    const [initialValues, _setInitialValues] = useState({ rating: 1, title: "", comment: "" })

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
    const review = useMemo(() => {
        return canCreateReview?.data?.review as IReview
    }, [canCreateReview])

    const stats = useMemo(() => {
        const ratingDistribution = Object.keys(RatingValue).map((key) => {
            return {
                title: RatingValue[+key],
                count: canCreateReview?.data?.stats?.ratingDistribution.find((dist) => dist.rating == +key)?.count ?? 0
            }
        })

        console.log(ratingDistribution, ">>>>>>>")
        return { ...canCreateReview?.data?.stats ?? {}, ratingDistribution }
    }, [canCreateReview])

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
                                {(reviewData?.data?.length || canCreateReview?.data?.review) && <><span className='score'>{stats?.averageRating}</span>
                                    <div>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <span key={index} className={`empty ${getCircleStyle(index, stats?.averageRating ?? 0)}`}></span>
                                        ))}

                                        {/* <span className="filled"></span>
                                        <span className="filled"></span>
                                        <span className="filled"></span>
                                        <span className="partially"></span>
                                        <span className="empty"></span> */}
                                    </div>


                                </>}
                                <span>
                                    {stats?.totalReviews} reviews
                                </span>
                            </div>
                            <div className='review-bars'>
                                {stats?.ratingDistribution?.reverse()?.map((review, index) => {
                                    return <div key={index}>
                                        <span className='review-text'>{review?.title}</span>
                                        <div className='bar'>
                                            <div className='bar-fill' style={{
                                                width: `${(review?.count / (stats?.totalReviews ?? 1))*100}%`
                                            }}></div>
                                        </div>
                                        <span className='review-number'>{review?.count}</span>
                                    </div>
                                })}

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
                                                    {[1, 2, 3, 4, 5].map((circle, index) => {
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
                            {canCreateReview?.data?.review && <div className='review-content'>
                                <div className='review-header'>
                                    <div className='symbol'>{review.user?.fullName?.charAt(0)}</div>
                                    <div className='user-detail'>
                                        <span>{review.user?.fullName}</span>
                                        <span>{format(review?.createdAt as string, "LLL dd, yyyy")}</span>
                                    </div>
                                </div>
                                <div className='rating-circle'>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <span className={classNames("empty", {
                                            "filled": index < review.rating
                                        })}></span>

                                    ))}
                                </div>
                                <div className='review-description'>
                                    <h5>{review.title}</h5>
                                    <p>{review.comment}</p>
                                </div>
                            </div>}
                            {
                                reviewData?.data?.length ? reviewData?.data?.map((review, index) => {
                                    return <div className='review-content' key={index}>
                                        <div className='review-header'>
                                            <div className='symbol'>{review.user?.fullName?.charAt(0)}</div>
                                            <div className='user-detail'>
                                                <span>{review.user?.fullName}</span>
                                                <span>{format(review?.createdAt as string, "LLL dd, yyyy")}</span>
                                            </div>
                                        </div>
                                        <div className='rating-circle'>
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <span className={classNames("empty", {
                                                    "filled": index < review.rating
                                                })}></span>

                                            ))}
                                        </div>
                                        <div className='review-description'>
                                            <h5>{review.title}</h5>
                                            <p>{review.comment}</p>
                                        </div>
                                    </div>
                                })
                                    : <>
                                        {!canCreateReview?.data?.review && <>
                                            <h5 className='no-review'>No one reviewed yet !</h5>
                                        </>}
                                    </>
                            }
                        </div>
                    </div>
                </div>


            </div >



        </>
    )
}

export default SingleTripView