import React, { useRef, useState } from 'react'
import { useGetTripQuery } from '../../../redux/services/trip'
import { IChildRef } from '../GetTrip'
import TripDetailModel from '../../../components/Dashboard/Modals/TripDetailModel'
import TripCard from '../../../components/Dashboard/TripCard'
import { IGetTripResponse } from '../../../contracts/IGetTripResponse'
import BookingModal from '../../../components/Dashboard/Booking/BookingModal'
import { useLazyCanCreateReviewQuery, useLazyGetReviewOfTripQuery } from '../../../redux/services/review'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import { Value } from '../GetBooking'
import { endOfYear, startOfYear } from 'date-fns'

const AllTrip = () => {
    const [trip, setCurrentTrip] = useState<IGetTripResponse | null>(null)
    const singleTripRef = useRef<IChildRef>()
    const [query, setQuery] = useState<{ dateRange: Value, place: string }>({
        dateRange: [startOfYear(new Date()), endOfYear(new Date())],
        place: ""
    })
    const [showBooking, setShowBooking] = useState(false);

    const { data } = useGetTripQuery({ ...query })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery({
            ...query,
            [e.target.name]: e.target.value
        })
    }

    const OnDateChange = (date: Value) => {
        setQuery({
            ...query,
            dateRange: date
        })
    }


    // here  we will intialize both review lazy rtk hook and pass it in TripCard and call it from there
    const [getReviewTrigger, { data: reviewData }] = useLazyGetReviewOfTripQuery()
    const [canCreateReview, { data: createReview }] = useLazyCanCreateReviewQuery()

    return (
        <>
            <div className="filters">
                <div className="search-input">
                    <input className="search" placeholder="Search place" name="place" onChange={onChange} />
                    <div className="search-icon">
                        <i className="fas fa-search"></i>
                    </div>
                </div>
                <DateRangePicker
                    dayPlaceholder="DD"
                    monthPlaceholder="MM"
                    yearPlaceholder="YYY"
                    className="custom-date-picker"
                    onChange={OnDateChange}
                    value={query.dateRange}
                    calendarIcon={<i className="fas fa-calendar"></i>}
                />
            </div>
            {data?.length ? <>

                <div className='ty-trip-card-list'>
                    {data?.map((trip, index) => {
                        return <React.Fragment key={index}>
                            <TripCard
                                canCreateReview={canCreateReview}
                                getReviewTrigger={getReviewTrigger}
                                key={index}
                                trip={trip}
                                singleTripRef={singleTripRef}
                                setCurrentTrip={setCurrentTrip}
                            />
                        </React.Fragment>
                    })}
                </div>

                <TripDetailModel reviewData={reviewData} createReview={createReview} setShowBooking={setShowBooking} ref={singleTripRef} trip={trip} />

                <BookingModal show={showBooking} trip={trip as IGetTripResponse} handleClose={() => setShowBooking(false)} />
            </> : <>
                {/* no-trip-imagination */}
                <div className="no-trip-animation">
                    {/* @ts-ignore */}
                    <dotlottie-player className="lottie-animation" src="https://lottie.host/64399492-7487-4946-880b-95ff9eae4015/HfG6jmgzJE.json" background="transparent" speed="1" style={{ width: "500px", height: "500px" }} loop autoplay></dotlottie-player>
                    <div className="no-trip-text">
                        <p>No trips available. Check back soon for <span>new adventures!</span></p>
                    </div>
                </div>

            </>}

        </>
    )
}

export default AllTrip