import React from 'react'
import { useGetTripQuery } from '../../../redux/services/trip'
import { Table } from 'react-bootstrap'

const AllTrip = () => {
    const { data } = useGetTripQuery()
    console.log(data, ">>>>>>>")
    return (
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
            </Table></div>
    )
}

export default AllTrip