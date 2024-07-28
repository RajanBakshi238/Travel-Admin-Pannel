import { useGetTripQuery } from '../../../redux/services/trip'
import { Table } from 'react-bootstrap'

import "./style.scss"
import TripDetailModel from '../../../components/Dashboard/Modals/TripDetailModel'
import { useRef } from 'react'

export interface IChildRef {
    handleClose: () => void;
    handleShow: () => void;
}

const GetTrip = () => {
    const { data } = useGetTripQuery()
    const singleTripRef = useRef<IChildRef>()
    console.log(data, ">>>>>>>")
    return (
        <>
            <div className='ty-trip-card-list'>


                <div className='ty-card'>
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
                <div className='ty-card'>
                    <div className="ty-img-block">
                        <img className='ty-card-img' src='/img/trip/trip-1.jpg' />
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
                <div className='ty-card'>
                    <div className="ty-img-block">
                        <img className='ty-card-img' src='/img/trip/trip-2.jpg' />
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
                <div className='ty-card'>
                    <div className="ty-img-block">
                        <img className='ty-card-img' src='/img/trip/trip-3.jpg' />
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
                <div className='ty-card'>
                    <div className="ty-img-block">
                        <img className='ty-card-img' src='/img/trip/trip-4.jpg' />
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
                <div className='ty-card'>
                    <div className="ty-img-block">
                        <img className='ty-card-img' src='/img/trip/trip-5.jpg' />
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
                <div className='ty-card'>
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
                <div className='ty-card'>
                    <div className="ty-img-block">
                        <img className='ty-card-img' src='/img/trip/trip-1.jpg' />
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
                <div className='ty-card'>
                    <div className="ty-img-block">
                        <img className='ty-card-img' src='/img/trip/trip-2.jpg' />
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
                <div className='ty-card'>
                    <div className="ty-img-block">
                        <img className='ty-card-img' src='/img/trip/trip-3.jpg' />
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
                <div className='ty-card'>
                    <div className="ty-img-block">
                        <img className='ty-card-img' src='/img/trip/trip-4.jpg' />
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
                <div className='ty-card'>
                    <div className="ty-img-block">
                        <img className='ty-card-img' src='/img/trip/trip-5.jpg' />
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
                <div className='ty-card'>
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
                <div className='ty-card'>
                    <div className="ty-img-block">
                        <img className='ty-card-img' src='/img/trip/trip-1.jpg' />
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
                <div className='ty-card'>
                    <div className="ty-img-block">
                        <img className='ty-card-img' src='/img/trip/trip-2.jpg' />
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
                <div className='ty-card'>
                    <div className="ty-img-block">
                        <img className='ty-card-img' src='/img/trip/trip-3.jpg' />
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
                <div className='ty-card'>
                    <div className="ty-img-block">
                        <img className='ty-card-img' src='/img/trip/trip-4.jpg' />
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
                <div className='ty-card'>
                    <div className="ty-img-block">
                        <img className='ty-card-img' src='/img/trip/trip-5.jpg' />
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
            </div>

            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Pick up</th>
                            <th>Place</th>
                            <th>Price</th>
                            <th>Start date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((trip, index) => {
                            return <tr key={index}>
                                <td>{index}</td>
                                <td>{trip.pickUp}</td>
                                <td>{trip.place}</td>
                                <td>{trip.price}</td>
                                <td>{new Date(trip.startDate).toString()}</td>
                                <td><button className='btn btn-primary'>View</button></td>
                            </tr>
                        })}

                    </tbody>
                </Table>
            </div>


            <TripDetailModel ref={singleTripRef} />

            <button onClick={() => {
                if (singleTripRef?.current) {
                    singleTripRef?.current?.handleShow()
                }
            }}>Open Modal</button>

        </>

    )
}

export default GetTrip