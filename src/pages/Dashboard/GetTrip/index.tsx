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

    const [query, setQuery] = useState<{ place: string }>({
        // dateRange: [new Date(), new Date()],
        place: ""
    })
    const { data } = useGetTripQuery({ ...query })
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

            {data?.length ? <>

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
            </> : <>
                {/* no-trip-imagination */}
                <div className="no-trip-animation">
                    {/* @ts-ignore */}
                    <dotlottie-player className="lottie-animation" src="https://lottie.host/64399492-7487-4946-880b-95ff9eae4015/HfG6jmgzJE.json" background="transparent" speed="1" style={{ width: "500px", height: "500px" }} loop autoplay></dotlottie-player>
                    <div className="no-trip-text">
                        <p>No trips available. Check back soon for <span>new adventures!</span></p>
                    </div>
                </div>
            </>}
            <TripDetailModel ref={singleTripRef} trip={trip} />



        </>

    )
}

export default GetTrip