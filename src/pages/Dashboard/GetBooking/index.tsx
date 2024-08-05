import { useGetBookingQuery } from "../../../redux/services/booking"

const GetBooking = () => {
    const {data} = useGetBookingQuery({})

    console.log(data, ">>>>>>>> data ")

  return (
    <div>index</div>
  )
}

export default GetBooking