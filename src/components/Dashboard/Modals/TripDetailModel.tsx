import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal } from "react-bootstrap"
import SingleTripView from "./SingleTripView";
import { IGetTripResponse } from "../../../contracts/IGetTripResponse";

const TripDetailModel = forwardRef(({ trip }: { trip: IGetTripResponse | null }, ref) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useImperativeHandle(ref, () => ({
        handleClose,
        handleShow
    }))

    console.log(trip, ">>>>>>>>>>>>>>> ref")
    return (
        <Modal className="trip-detail-model" size="lg" show={show} onHide={handleClose}>
            {/* <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header> */}
            <SingleTripView trip={trip as IGetTripResponse } />
        </Modal>
    )
})

export default TripDetailModel