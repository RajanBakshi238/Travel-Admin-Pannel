import { useGetTripQuery } from '../../../redux/services/trip'

import "./style.scss"
import TripDetailModel from '../../../components/Dashboard/Modals/TripDetailModel'
import { useRef, useState } from 'react'
import TripCard from '../../../components/Dashboard/TripCard'
import { IGetTripResponse } from '../../../contracts/IGetTripResponse'

export interface IChildRef {
    handleClose: () => void;
    handleShow: () => void;
}

const GetTrip = () => {
    const { data } = useGetTripQuery()
    const [trip, setCurrentTrip] = useState<IGetTripResponse | null>(null)
    const singleTripRef = useRef<IChildRef>()
    // console.log(data, ">>>>>>>")
    return (
        <>
            <div className='ty-trip-card-list'>
                {data?.map((trip, index) => {
                    return <>
                        <TripCard key={index} trip={trip} singleTripRef={singleTripRef} setCurrentTrip={setCurrentTrip} />
                    </>
                })}
            </div>

            <TripDetailModel ref={singleTripRef} trip={trip} />



        </>

    )
}

export default GetTrip