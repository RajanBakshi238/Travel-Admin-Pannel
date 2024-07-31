import { useRef } from 'react'
import { useGetTripQuery } from '../../../redux/services/trip'
import { IChildRef } from '../GetTrip'
import TripDetailModel from '../../../components/Dashboard/Modals/TripDetailModel'
import TripCard from '../../../components/Dashboard/TripCard'

const AllTrip = () => {
    const { data } = useGetTripQuery()
    console.log(data, ">>>>>>>")
    const singleTripRef = useRef<IChildRef>()

    return (
        <>
            <div className='ty-trip-card-list'>
                {data?.map((trip, index) => {
                    return <>
                        <TripCard key={index} trip={trip} singleTripRef={singleTripRef} />
                    </>
                })}
            </div>

            <TripDetailModel ref={singleTripRef} />



        </>
    )
}

export default AllTrip