import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react"
import { format } from "date-fns"
import "./styles.scss"
import { IChildRef } from "../../../pages/Dashboard/GetTrip"
import { IGetTripResponse } from "../../../contracts/IGetTripResponse"

interface ITripCard {
    singleTripRef: MutableRefObject<IChildRef | undefined>,
    trip?: IGetTripResponse,
    setCurrentTrip: Dispatch<SetStateAction<IGetTripResponse | null>>

}

const TripCard: React.FC<ITripCard> = ({ singleTripRef, trip, setCurrentTrip }) => {


    const handleViewTripDetails = () => {
        if (singleTripRef?.current) {
            singleTripRef?.current?.handleShow();
            setCurrentTrip(trip as IGetTripResponse)
        }
    }

    return (
        <div className='ty-card'>
            <div className="view-card-details" onClick={handleViewTripDetails}>
                <i className='fas fa-eye'></i>
            </div>
            <div className="ty-img-block">
                {/* <img className='ty-card-img' src='/img/trip/trip.jpg' /> */}
                <img className='ty-card-img' src={`${import.meta.env.VITE_BACKEND_URL}${trip?.photos[0]?.path}`} />
            </div>
            <div className='ty-card-content'>
                <h3 className='card-heading'>{trip?.place} <span>${trip?.price}</span></h3>
                <h3 className='seats-desc'>{trip?.leftSeats} <span>Seats Left</span> </h3>
                {/* <p className='card-description'>Great place to visit (description)</p> */}
                <p className='card-description'></p>
                {/* <p className='card-pickup'>
                    Pickup: <span>{trip?.pickUp}</span>
                </p> */}
                <div className="date-block">
                    <p className='card-date'> Date :</p>
                    <p className='card-date'>
                        <span>{format(trip?.endDate as string, "LLL dd, yyyy")}</span>
                        {/* <span>Aug 23, 2024</span> */}
                    </p>
                    <p>-</p>
                    <p className='card-date'>
                        <span>{format(trip?.endDate as string, "LLL dd, yyyy")}</span>
                        {/* <span>Aug 23, 2024</span> */}
                    </p>
                </div>
                {/* <p className='card-date'>
                        Start Date : <span>Aug 23, 2024</span> 
                    </p>
                    <p className='card-date'>
                        End Date :  <span>Aug 23, 2024</span>
                    </p> */}

            </div>
        </div>
    )
}

export default TripCard