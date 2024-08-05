import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./style.scss"
import { IGetTripResponse } from '../../../contracts/IGetTripResponse';
import RenderContent from '../../Authentication/RenderContent';
import { USER } from '../../../contracts/constants/roleConstant';

import { toast } from 'react-toastify';

const SingleTripView = ({ trip, handleShowBooking, handleClose }: { trip: IGetTripResponse, handleShowBooking: any, handleClose: any }) => {

    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const handleBookTrip = () => {
        if (trip.leftSeats == 0) {
            toast("No seats left", {
                type: "error",
                theme: "colored"
            })
            return
        }
        handleShowBooking()
        handleClose();
    }

    return (
        <>
            <div className="single-trip-view-modal">

                <div className="itinerary-c">
                    <h1 className="trip-heading">Image Gallery</h1>
                    <div className=" image-carousel">

                        <Carousel showThumbs={false} dynamicHeight={false} >
                            {trip?.photos?.map((photo, index) => {
                                return <div key={index}>
                                    <img src={`${import.meta.env.VITE_BACKEND_URL}${photo?.path}`} alt="trip" />
                                </div>
                            })}
                            {/* <div>
                            <img src="/img/trip/trip-images/trip-image-1.jpg" alt="trip" />
                        </div>
                        <div>
                            <img src="/img/trip/trip-images/trip-image-2.jpg" alt="trip" />
                        </div>
                        <div>
                            <img src="/img/trip/trip-images/trip-image-3.jpg" alt="trip" />
                        </div>
                        <div>
                            <img src="/img/trip/trip-images/trip-image-4.jpg" alt="trip" />
                        </div> */}
                        </Carousel>
                    </div>
                </div>

                <div className="itinerary-c">
                    <h1 className="trip-heading exclusion-heading">Itinerary</h1>
                    <div className="itinerary-road-map">
                        <div className="bus-top">
                            <i className="fas fa-bus"></i>
                        </div>
                        {trip?.itinerary?.map((itiner, index) => {
                            return <div className="itinerary-map-item" key={index}>
                                <div className="left-item">
                                    Day {itiner?.day}
                                </div>
                                <div className="right-item">
                                    {itiner?.description?.[0]}
                                </div>
                            </div>
                        })}
                        {/* <div className="itinerary-map-item">
                        <div className="left-item">
                            Day 0
                        </div>
                        <div className="right-item">
                            Departure to chopta in the evening
                        </div>
                    </div> */}
                        {/* <div className="itinerary-map-item">
                        <div className="left-item">
                            Day 1
                        </div>
                        <div className="right-item">
                            Reach chopta and check in to camps
                        </div>
                    </div>
                    <div className="itinerary-map-item">
                        <div className="left-item">
                            Day 2
                        </div>
                        <div className="right-item">
                            Trek from chopta to tungnath chandrashila
                        </div>
                    </div>
                    <div className="itinerary-map-item">
                        <div className="left-item">
                            Day 3
                        </div>
                        <div className="right-item">
                            Chopta to sari deoriatal and departure back to delhi
                        </div>
                    </div>
                    <div className="itinerary-map-item">
                        <div className="left-item">
                            Day 4
                        </div>
                        <div className="right-item">
                            Reach back in the early morning.
                        </div>
                    </div> */}
                        <div className="bus-top bottom">
                            <i className="fas fa-bus"></i>
                        </div>
                    </div>
                </div>



                {/* <div className="itinerary-c">
                <h1 className="trip-heading exclusion-heading">Batches</h1>
                <div className="batches">
                    <div className="batches-dates">
                        <div className="month">
                            May
                        </div>
                        <div className="date-intervals">
                            <div>03-May to  07-May</div>
                            <div>10-May to  14-May</div>
                            <div>17-May to  21-May</div>
                            <div>24-May to  28-June</div>
                            <div>31-May to  04-June</div>
                        </div>
                    </div>
                    <div className="batches-dates">
                        <div className="month">
                            June
                        </div>
                        <div className="date-intervals">
                            <div>07-June to  12-June</div>
                            <div>14-June to  19-June</div>
                            <div>21-June to  26-June</div>
                            <div>28-June to  02-July</div>
                        </div>
                    </div>
                    <div className="batches-dates">
                        <div className="month">
                            July
                        </div>
                        <div className="date-intervals">
                            <div>05-July to  09-July</div>
                            <div>12-July to  16-July</div>
                            <div>19-July to  23-July</div>
                            <div>26-July to  30-July</div>
                        </div>
                    </div>
                    <div className="batches-dates">
                        <div className="month">
                            Aug
                        </div>
                        <div className="date-intervals">
                            <div>03-Aug to  10-Aug</div>
                            <div>13-Aug to  17-Aug</div>
                            <div>20-Aug to  24-Aug</div>
                            <div>27-Aug to  01-Sep</div>
                        </div>
                    </div>
                </div>
            </div> */}

                <div className="itinerary-c day-page-detail">
                    {
                        trip?.itinerary?.map((itiner, index) => {
                            return <div key={index}>
                                <h1 className="trip-heading exclusion-heading">Day {itiner?.day}</h1>
                                <div className="inclusions">
                                    <ul>
                                        {itiner?.description?.map((desc, idx) => {
                                            return <li key={idx}>{desc}</li>
                                        })}
                                        {/* <li>Departure in the evening to Chopta.</li>
                                    <li>The group will assemble at the pickup point.</li>
                                    <li>Afterward, you'll be introduced to the team captains and the whole group.</li>
                                    <li>Halt for dinner in between (not on us).</li> */}
                                    </ul>
                                </div>
                            </div>

                        })
                    }


                    {/* <div>
                    <h1 className="trip-heading exclusion-heading">Day 0</h1>
                    <div className="inclusions">
                        <ul>
                            <li>Departure in the evening to Chopta.</li>
                            <li>The group will assemble at the pickup point.</li>
                            <li>Afterward, you'll be introduced to the team captains and the whole group.</li>
                            <li>Halt for dinner in between (not on us).</li>
                        </ul>
                    </div>
                </div> */}

                    {/* <div>
                    <h1 className="exclusion-heading trip-heading">Day 1</h1>
                    <div className="exclusions">
                        <li>Reach Chopta, Swiss camp Check-in.</li>
                        <li>Freshen up & rest for some time.</li>
                        <li>Enjoy the views in the lap of nature.</li>
                        <li>Followed by dinner and overnight stay.</li>
                    </div>
                </div>

                <div>
                    <h1 className="trip-heading exclusion-heading">Day 2</h1>
                    <div className="inclusions">
                        <ul>
                            <li>Wake up early & witness the beautiful sunrise. Start your day early today.</li>
                            <li>Have breakfast and leave for Tungnath</li>
                            <li>Start your trek to Tungnath (World’s highest Shiva temple)</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <h1 className="exclusion-heading trip-heading">Day 3</h1>
                    <div className="exclusions">
                        <li>Wake up and have your breakfast.</li>
                        <li>Check-out and leave for Sari Village (Base point for Deoria Tal trek).</li>
                        <li>Reach Deoria Tal and enjoy the picturesque views.</li>
                        <li>Trek back to Sari Village.</li>
                        <li>Departure from Deoria Tal in the evening.</li>
                    </div>
                </div> */}
                </div>



                <div className="itinerary-c">
                    <h1 className="trip-heading exclusion-heading">Inclusions</h1>
                    <div className="inclusions">
                        <ul>
                            {trip?.inclusions?.map((inclusion, index) => {
                                return <li key={index}>{inclusion}</li>
                            })}

                            {/* <li>Accomodation (2-night stay in chopta)</li>
                        <li>4 Meals (2 breakfast + 2 dinners)</li>
                        <li>Transfer to/from in AC Traveler</li>
                        <li>All sightseeing mentioned in the itinerary</li>
                        <li>Trekking to Tungnath chandrashilla</li>
                        <li>Trip Captain</li> */}
                        </ul>
                    </div>

                    <h1 className="exclusion-heading trip-heading">Exclusions</h1>
                    <div className="exclusions">
                        {trip?.exclusions?.map((exclusion, index) => {
                            return <li key={index}>{exclusion}</li>
                        })}
                        {/* <li>Any other Food and Beverage charge that is not included in the package.</li> */}
                        {/* <li>Any other expense nsot included in the inclusion column.</li>
                    <li>Any other costing involved due to natural calamity forced circumstances which are out of our control.</li>
                    <li>Any entry tickets to the viewpoints.</li> */}
                    </div>
                </div>

                <div className="itinerary-c">
                    <h1 className="trip-heading exclusion-heading">Terms and conditions</h1>
                    <div className="terms-conditions">
                        <ul>
                            {trip?.termsAndConditions?.map((term, index) => {
                                return <li key={index}>{term}</li>
                            })}
                            {/* <li>The advance amount is non-refundable under any circumstances.</li>
                        <li>Full Payment of the trip cost must be made 24 hours before the trip begins. Pending Payments may eventually lead to the cancellation of your booking.</li>
                        <li>The IDs will be verified before boarding. No boarding shall be entertained without a valid Govt. ID.</li>
                        <li>The Transfer of the bookings is not permitted. Only the names mentioned at the time of confirmation shall be allowed to travel.</li> */}
                            {/* <li>No refunds shall be made towards any inclusion(s) not availed by the Client.</li>
                        <li>Travelers must take care of their luggage & belongings. The management shall not be accountable for missing items along the tour.</li>
                        <li>The time of departure is stated & fixed. All travelers must update their status with the Trip Coordinator(s), & report at the pickup point 30 mins prior to the scheduled departure.</li>
                        <li>Drinking & Smoking are strictly prohibited during journey due to the health & safety of fellow passengers.</li>
                        <li>No act of misconduct or indiscipline shall be tolerated on the tours. We are a cordial travel community and we aspire to bring to you a hassle-free and memorable experience.</li>
                        <li>Trip Ek Art shall not be responsible for any delays or alterations in the program or indirectly incurred expenses in cases such as natural hazards, accidents, breakdown of machinery, weather conditions, landslides, political closure, or any untoward incidents.</li>
                        <li>We do not provide any insurance policy to cover the expenditure on sickness or accidents or losses incurred due to theft or other reasons.</li>
                        <li>
                            Numerous factors such as weather and road conditions the physical ability of participants etc. may bring alteration in the itinerary. We reserve the right to make necessary changes in the schedule in the interest of safety, comfort, and general well-being!
                        </li> */}
                        </ul>
                    </div>

                </div>


                <RenderContent authorizedRole={[USER]}>
                    <div className='book-trip-block'>
                        <button className='btn btn-primary' onClick={handleBookTrip}>Book trip</button>
                    </div>
                </RenderContent>
            </div>



        </>
    )
}

export default SingleTripView