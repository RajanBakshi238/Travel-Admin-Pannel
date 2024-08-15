
const ContactUs = () => {
    return (
        <>
            <div className="container-xxl py-5 wow fadeInUp" id="yatri-contact-us" data-wow-delay="0.1s">
                <div className="container">
                    <div className="booking p-5">
                        <div className="row g-5 align-items-center">
                            <div className="col-md-6 text-white">
                                {/* <h6 className="text-white text-uppercase">Query</h6> */}
                                <h1 className="text-white mb-4">Contact Us</h1>
                                <p className="mb-4">At travelYatri, we know that every traveler is unique. That’s why we offer the option to design your own tour package tailored to your preferences. Whether you’re looking to explore hidden gems, indulge in local cuisine, or embark on an adventure, we’re here to make it happen.</p>
                                <p className="mb-4">Simply fill the form and our team will get in touch to craft the perfect itinerary for you. Let’s make your dream trip a reality</p>
                                {/* <a className="btn btn-outline-light py-3 px-5 mt-2" href="">Read More</a> */}
                            </div>
                            <div className="col-md-6">
                                <h1 className="text-white mb-4">Customize your trip</h1>
                                <form>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control bg-transparent" id="name" placeholder="Your Name" />
                                                <label htmlFor="name">Your Name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="email" className="form-control bg-transparent" id="email" placeholder="Your Email" />
                                                <label htmlFor="email">Your Email</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating date" id="date3" data-target-input="nearest">
                                                <input type="text" className="form-control bg-transparent datetimepicker-input" id="datetime" placeholder="Date & Time" data-target="#date3" data-toggle="datetimepicker" />
                                                <label htmlFor="datetime">Date & Time</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <select className="form-select bg-transparent" id="select1">
                                                    <option value="1">Destination 1</option>
                                                    <option value="2">Destination 2</option>
                                                    <option value="3">Destination 3</option>
                                                </select>
                                                <label htmlFor="select1">Destination</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea className="form-control bg-transparent" placeholder="Special Request" id="message" style={{ height: "100px" }}></textarea>
                                                <label htmlFor="message">Special Request</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-outline-light w-100 py-3" type="submit">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ContactUs