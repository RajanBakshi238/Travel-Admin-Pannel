import { useGetTripQuery } from '../../../redux/services/trip'

import "./style.scss"
import TripDetailModel from '../../../components/Dashboard/Modals/TripDetailModel'
import { useRef } from 'react'
import TripCard from '../../../components/Dashboard/TripCard'

export interface IChildRef {
    handleClose: () => void;
    handleShow: () => void;
}

const GetTrip = () => {
    const { data } = useGetTripQuery()
    const singleTripRef = useRef<IChildRef>()
    // console.log(data, ">>>>>>>")
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

export default GetTrip