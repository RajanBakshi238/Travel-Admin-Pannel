import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal } from "react-bootstrap"
import SingleTripView from "./SingleTripView";

const TripDetailModel = forwardRef((_props, ref) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useImperativeHandle(ref, () => ({
        handleClose,
        handleShow
    }))


    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <SingleTripView />
        </Modal>
    )
})

export default TripDetailModel