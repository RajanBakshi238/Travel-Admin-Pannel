import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from "react"
import { format } from "date-fns"
import "./styles.scss"
import { IChildRef } from "../../../pages/Dashboard/GetTrip"
import { IGetTripResponse } from "../../../contracts/IGetTripResponse"
import RenderContent from "../../Authentication/RenderContent"
import { ADMIN, ORGANIZER } from "../../../contracts/constants/roleConstant"
import Confirmation from "../../common/Popups/Confirmation"
import { useDeleteTripMutation } from "../../../redux/services/trip"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

interface ITripCard {
    singleTripRef: MutableRefObject<IChildRef | undefined>,
    trip?: IGetTripResponse,
    setCurrentTrip: Dispatch<SetStateAction<IGetTripResponse | null>>

}

const TripCard: React.FC<ITripCard> = ({ singleTripRef, trip, setCurrentTrip }) => {
    const [showModal, setShowModal] = useState(false);
    const [deleteTrip] = useDeleteTripMutation()
    const navigate = useNavigate();

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleViewTripDetails = () => {
        if (singleTripRef?.current) {
            singleTripRef?.current?.handleShow();
            setCurrentTrip(trip as IGetTripResponse)
        }
    }

    const handleDelete = () => {
        deleteTrip({ id: trip?._id as string }).unwrap().then((res) => {
            console.log(res, ">>>>>>>response ")
        }).catch((error) => {
            console.log(error, ">?>>>>>>>> error")
        }).finally(() => {
            handleClose()
        })
    }



    const handleEdit = () => {
        if (trip?.leftSeats === trip?.totalSeats) {
            navigate(`/dashboard/trip/${trip?._id}`)
        } else {
            // error
            toast("Can't edit trips, as booking is started. Please contact admin!", {
                type: "error",
                theme: "colored"
            })
        }
    }

    return (
        <>
            <div className='ty-card'>
                <div className="action-icons">
                    <div className="view-card-details" onClick={handleViewTripDetails}>
                        <i className='fas fa-eye'></i>
                    </div>
                    <RenderContent authorizedRole={[ADMIN, ORGANIZER]}>

                        <div className="delete-trip" onClick={handleShow}>
                            <i className="fas fa-trash-alt"></i>
                        </div>
                    </RenderContent>
                    <RenderContent authorizedRole={[ORGANIZER]}>
                        <div className="edit-trip" onClick={handleEdit}>
                            <i className="fas fa-edit"></i>
                        </div>
                    </RenderContent>
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
            <Confirmation
                title="Confirm Delete"
                description="Are you sure you want to delete this item?"
                btnText="Delete"
                show={showModal}
                handleClose={handleClose}
                handleDelete={handleDelete}
            />
        </>
    )
}

export default TripCard