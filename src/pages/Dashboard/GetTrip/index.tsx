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

// type ValuePiece = Date | null;

// export type Value = ValuePiece | [ValuePiece, ValuePiece];

const GetTrip = () => {

    const [query, setQuery] = useState<{  place: string }>({
        // dateRange: [new Date(), new Date()],
        place: ""
    })
    const { data } = useGetTripQuery({...query})
    const [trip, setCurrentTrip] = useState<IGetTripResponse | null>(null)
    const singleTripRef = useRef<IChildRef>()


    // const OnDateChange = (date: Value) => {
    //     setQuery({
    //         ...query,
    //         dateRange: date
    //     })
    // }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery({
            ...query,
            [e.target.name]: e.target.value
        })
    }

    // console.log(data, ">>>>>>>")
    return (
        <>
            <div className="filters">
                <div className="search-input">
                    <input className="search" placeholder="Search place" name="place" onChange={onChange} />
                    <div className="search-icon">
                        <i className="fas fa-search"></i>
                    </div>
                </div>

                {/* <DateRangePicker
                    dayPlaceholder="DD"
                    monthPlaceholder="MM"
                    yearPlaceholder="YYY"
                    className="custom-date-picker"
                    onChange={OnDateChange}
                    value={query.dateRange}
                    calendarIcon={<i className="fas fa-calendar"></i>}
                /> */}
            </div>


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