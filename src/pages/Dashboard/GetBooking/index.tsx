import { startOfDay, endOfDay } from "date-fns"

import CommonTable from "../../../components/common/Tables"
import { IGetTripResponse } from "../../../contracts/IGetTripResponse"
import { IUser } from "../../../contracts/IUser"
import { useGetBookingQuery } from "../../../redux/services/booking"
import { format } from "date-fns"
import { truncateString } from "../../../utils/truncateString"
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

import "./style.scss"
import { useState } from "react"
import classNames from "classnames"

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];


const tableRow = {
    bookingStatus: "Status",
    // organizerName: "Organizer",
    place: "Trip",
    // pickUp: "Pick up",
    usersNo: "Users",
    startDate: "Start",
    endDate: "End",
    booking: "Booking Date",
    totalCost: "Price",
    razorpayPaymentId: "Payment id"
}
const GetBooking = () => {
    const [query, setQuery] = useState<{ dateRange: Value, search: string }>({
        dateRange: [startOfDay(new Date()), endOfDay(new Date())],
        search: ""
    })
    const { data } = useGetBookingQuery({ ...query })

    const tableData = data?.data?.map((data) => {
        return {
            ...data,
            bookingStatus: <div className={classNames({
                "text-danger-cust": data.bookingStatus === "Failed",
                "text-success-cust": data.bookingStatus === "Accepted"
            })}>{data.bookingStatus}</div>,
            organizerName: (data?.organizerId as IUser)?.fullName ?? '-',
            place: (data?.tripId as IGetTripResponse)?.place ?? '-',
            pickUp: truncateString((data?.tripId as IGetTripResponse)?.pickUp, 15) ?? '-',
            usersNo: data?.users?.length ?? '-',
            startDate: format((data?.tripId as IGetTripResponse)?.startDate as string, "LLL dd, yyyy") ?? '-',
            endDate: format((data?.tripId as IGetTripResponse)?.endDate as string, "LLL dd, yyyy") ?? '-',
            booking: format((data?.createdAt) as string, "LLL dd, yyyy") ?? '-',

        }
    })


    const OnDateChange = (date: Value) => {
        setQuery({
            ...query,
            dateRange: date
        })
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery({
            ...query,
            [e.target.name]: e.target.value
        })
    }


    console.log(query, ">>>> setQueryyyy")
    // console.log(tableData, ">>>>>")
    return (
        <>
            <div className="filters">
                <div className="search-input">
                    <input className="search" placeholder="search" onChange={onChange} name="search" />
                    <div className="search-icon">
                        <i className="fas fa-search"></i>
                    </div>
                </div>

                <DateRangePicker
                    dayPlaceholder="DD"
                    monthPlaceholder="MM"
                    yearPlaceholder="YYY"
                    className="custom-date-picker"
                    onChange={OnDateChange}
                    value={query.dateRange}
                    calendarIcon={<i className="fas fa-calendar"></i>}
                />
            </div>
            <div className="register-as-page admin-organizer">

                <CommonTable tableRow={tableRow} tableData={tableData ?? []} />


            </div>

        </>
    )
}

export default GetBooking