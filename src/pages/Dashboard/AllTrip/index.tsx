import { useRef, useState } from 'react'
import { useGetTripQuery } from '../../../redux/services/trip'
import { IChildRef } from '../GetTrip'
import TripDetailModel from '../../../components/Dashboard/Modals/TripDetailModel'
import TripCard from '../../../components/Dashboard/TripCard'
import { IGetTripResponse } from '../../../contracts/IGetTripResponse'
import BookingModal from '../../../components/Dashboard/Booking/BookingModal'

const AllTrip = () => {
    const { data } = useGetTripQuery({})
    const [trip, setCurrentTrip] = useState<IGetTripResponse | null>(null)
    console.log(data, ">>>>>>>")
    const singleTripRef = useRef<IChildRef>()

    const [showBooking, setShowBooking] = useState(false);


    return (
        <> {data?.length ? <>
            <div className='ty-trip-card-list'>
                {data?.map((trip, index) => {
                    return <>
                        <TripCard key={index} trip={trip} singleTripRef={singleTripRef} setCurrentTrip={setCurrentTrip} />
                    </>
                })}
            </div>

            <TripDetailModel setShowBooking={setShowBooking} ref={singleTripRef} trip={trip} />

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