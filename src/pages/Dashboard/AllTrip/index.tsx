import { useRef, useState } from 'react'
import { useGetTripQuery } from '../../../redux/services/trip'
import { IChildRef } from '../GetTrip'
import TripDetailModel from '../../../components/Dashboard/Modals/TripDetailModel'
import TripCard from '../../../components/Dashboard/TripCard'
import { IGetTripResponse } from '../../../contracts/IGetTripResponse'

const AllTrip = () => {
    const { data } = useGetTripQuery()
    const [trip, setCurrentTrip] = useState<IGetTripResponse | null>(null)
    console.log(data, ">>>>>>>")
    const singleTripRef = useRef<IChildRef>()

    return (
        <>
            <div className='ty-trip-card-list'>
                {data?.map((trip, index) => {
                    return <>
                        <TripCard key={index} trip={trip} singleTripRef={singleTripRef} setCurrentTrip={setCurrentTrip}  />
                    </>
                })}
            </div>

            <TripDetailModel ref={singleTripRef} trip={trip} />



        </>
    )
}

export default AllTrip