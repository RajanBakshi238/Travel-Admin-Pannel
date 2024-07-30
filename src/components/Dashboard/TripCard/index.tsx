import { MutableRefObject } from "react"
import "./styles.scss"
import { IChildRef } from "../../../pages/Dashboard/GetTrip"
import { IGetTripResponse } from "../../../contracts/IGetTripResponse"

interface ITripCard {
    singleTripRef: MutableRefObject<IChildRef | undefined>,
    trip?: IGetTripResponse
}

const TripCard: React.FC<ITripCard> = ({ singleTripRef, trip }) => {

    const handleViewTripDetails = () => {
        if (singleTripRef?.current) {
            singleTripRef?.current?.handleShow();
        }
    }

    return (
        <div className='ty-card'>
            <div className="view-card-details" onClick={handleViewTripDetails}>
                <i className='fas fa-eye'></i>
            </div>
            <div className="ty-img-block">
                <img className='ty-card-img' src='/img/trip/trip.jpg' />
            </div>
            <div className='ty-card-content'>
                <h3 className='card-heading'>{trip?.place} <span>${trip?.price}</span></h3>
                {/* <p className='card-description'>Great place to visit (description)</p> */}
                <p className='card-description'></p>
                {/* <p className='card-pickup'>
                    Pickup: <span>{trip?.pickUp}</span>
                </p> */}
                <div className="date-block">
                    <p className='card-date'> Date :</p>
                    <p className='card-date'>
                        <span>Aug 23, 2024</span>
                    </p>
                    <p>-</p>
                    <p className='card-date'>
                        <span>Aug 23, 2024</span>
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