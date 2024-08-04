import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal } from "react-bootstrap"
import SingleTripView from "./SingleTripView";
import { IGetTripResponse } from "../../../contracts/IGetTripResponse";

const TripDetailModel = forwardRef(({ trip, setShowBooking }: { trip: IGetTripResponse | null, setShowBooking?: (asgs: boolean) => void }, ref) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowBooking = () => {
        if (setShowBooking) {
            setShowBooking(true)
        }
    }
    // const handleCloseBooking = () => setShowBooking(false)
    useImperativeHandle(ref, () => ({
        handleClose,
        handleShow,
        // handleShowBooking,
        // handleCloseBooking
    }))

    console.log(trip, ">>>>>>>>>>>>>>> ref")
    return (
        <Modal className="trip-detail-model" size="lg" show={show} onHide={handleClose}>
            {/* <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header> */}
            <SingleTripView trip={trip as IGetTripResponse} handleShowBooking={handleShowBooking} handleClose={handleClose} />
        </Modal>
    )
})

export default TripDetailModel