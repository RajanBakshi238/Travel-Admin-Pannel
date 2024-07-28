import { MutableRefObject } from "react"
import "./styles.scss"
import { IChildRef } from "../../../pages/Dashboard/GetTrip"

interface ITripCard {
    singleTripRef: MutableRefObject<IChildRef | undefined>
}

const TripCard: React.FC<ITripCard> = ({ singleTripRef }) => {

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
                <h3 className='card-heading'>Chennai <span>$1200</span></h3>
                <p className='card-description'>Great place to visit (description)</p>
                <p className='card-pickup'>
                    Pickup: <span>Coimbatore</span>
                </p>
                <p className='card-date'>
                    From: <span>Aug 23, 2024</span>
                </p>
            </div>
        </div>
    )
}

export default TripCard