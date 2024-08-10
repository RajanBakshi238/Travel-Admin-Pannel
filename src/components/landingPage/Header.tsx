import { useCallback, useEffect, useRef, useState } from "react";
import RegisterModal from "../Authentication/registerModel";
import LoginModal from "../Authentication/loginModel";
import { useUserContext } from "../../context/User";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css"
import classNames from "classnames";
import { useLazyGetTripQuery } from "../../redux/services/trip";
import { format } from "date-fns";
import { toast } from "react-toastify";
export interface IChildRef {
    handleClose: () => void;
    handleShow: () => void;
}

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [activeSection, setActiveSection] = useState("yatri-home")
    const registerChildRef = useRef<IChildRef>();
    const loginChildRef = useRef<IChildRef>();
    const { user } = useUserContext()
    const navigate = useNavigate()
    const tripRef = useRef<HTMLDivElement | null>(null)
    const [isLeftDisabled, setIsLeftDisabled] = useState(true);
    const [isRightDisabled, setIsRightDisabled] = useState(false);
    const [showSearchedTrips, setShowSearchedTrips] = useState(false)
    const [place, setPlace] = useState("")
    const [fetchTrips, { data }] = useLazyGetTripQuery()

    const handleScrollBtnCheck = () => {
        const container = tripRef.current;
        if (container) {
            const maxScrollLeft = container.scrollWidth - container.clientWidth;
            setIsLeftDisabled(container.scrollLeft === 0);
            setIsRightDisabled(container.scrollLeft >= maxScrollLeft);
        }
    };

    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            setActiveSection(id)
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth',
            });
        }
    }, [])


    const handleScroll = () => {
        if (window.scrollY > 45) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const handleDashboardRedirection = () => {
        if (user?.role) {
            navigate("/dashboard")
        } else {
            loginChildRef.current?.handleShow();
        }
    }

    const scrollLeft = () => {
        if (tripRef.current) {
            tripRef.current.scrollBy({
                left: -200, // Scroll left by 200px
                behavior: 'smooth' // Smooth scrolling
            });
        }
    };

    const scrollRight = () => {
        if (tripRef.current) {
            tripRef.current.scrollBy({
                left: 200, // Scroll right by 200px
                behavior: 'smooth' // Smooth scrolling
            });
        }
    };

    useEffect(() => {
        handleScrollBtnCheck(); // Check button states on mount
        const container = tripRef.current;
        if (container) {
            container.addEventListener('scroll', handleScrollBtnCheck);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScrollBtnCheck);
            }
        };
    }, []);

    const onTripInputChange = (place: string) => {
        setPlace(place)
    }

    const handleSubmit = () => {
        fetchTrips({ place }).unwrap().then((response) => {
            console.log(response, ">>>>>>>>")
            if (response?.length === 0) {
                toast(`No trips are available for ${place}`, {
                    type: "default",
                    theme: "colored"
                })
                setShowSearchedTrips(false)
            } else {
                setShowSearchedTrips(true)
            }
        })
    }


    return (
        <>
            <div className="container-fluid position-relative p-0" id="yatri-home">
                <nav className={`navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0 ${isSticky ? 'sticky-top shadow-sm' : ''}`}>
                    <a href="" className="navbar-brand p-0">
                        <h1 className="text-primary m-0"><i className="fa fa-map-marker-alt me-3"></i>Travel Yatri</h1>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="fa fa-bars"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto py-0">
                            <a href="#yatri-home" className={`nav-item nav-link ${activeSection === "yatri-home" ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('yatri-home'); }}>Home</a>
                            <a href="#yatri-about" className={`nav-item nav-link ${activeSection === "yatri-about" ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('yatri-about'); }}>About</a>
                            <a href="#yatri-destination" className={`nav-item nav-link ${activeSection === "yatri-destination" ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('yatri-destination'); }}>Destination</a>
                            <a href="#yatri-contact-us" className={`nav-item nav-link ${activeSection === "yatri-contact-us" ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('yatri-contact-us'); }}>Contact Us</a>
                        </div>
                        {!user ? <a onClick={() => {
                            if (registerChildRef.current) {
                                registerChildRef.current.handleShow()
                            }
                        }} className="btn btn-primary rounded-pill py-2 px-4">Register</a> :
                            <>
                                <NavDropdown
                                    className="nav-drop-down"
                                    id="nav-dropdown-dark-example"
                                    title={<div className="user-icon-header">
                                        {user?.fullName.charAt(0)}
                                    </div>}
                                    menuVariant="dark"
                                >
                                    <NavDropdown.Item onClick={handleDashboardRedirection} >
                                        <span >Dashboard</span>
                                    </NavDropdown.Item>
                                </NavDropdown>


                            </>
                        }

                    </div>
                </nav>

                <div className="container-fluid bg-primary py-5 mb-5 hero-header">
                    <div className="container py-5">
                        <div className="row justify-content-center py-5">
                            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center position-relative">
                                <h1 className="display-3 text-white mb-3 animated slideInDown">Enjoy Your Vacation With Us</h1>
                                <p className="fs-4 text-white mb-4 animated slideInDown">Tempor erat elitr rebum at clita diam amet diam et eos erat ipsum lorem sit</p>
                                <div className="position-relative w-75 mx-auto animated slideInDown">
                                    <input name="place" onChange={(e) => onTripInputChange(e.target.value)} className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5" type="text" placeholder="Eg: Manali" />
                                    <button type="button" className="btn btn-primary rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2" style={{ "marginTop": "7px" }} onClick={handleSubmit}>Search</button>
                                </div>
                                {!!data?.length &&
                                    <div className={classNames("position-absolute searched-cards-section", {
                                        "d-none": !showSearchedTrips
                                    })}>
                                        <div className="cancel-trip" onClick={() => setShowSearchedTrips(false)}>X</div>

                                        <div className="searched-headers">
                                            <p>Top trips to Manali </p>
                                            <div className="more-btn">
                                                <i className={classNames("fas fa-chevron-left", {
                                                    "scroll-btn-disable": isLeftDisabled
                                                })} onClick={scrollLeft}></i>
                                                <i className={classNames("fas fa-chevron-right", {
                                                    "scroll-btn-disable": isRightDisabled
                                                })} onClick={scrollRight}></i>
                                            </div>
                                        </div>
                                        <div className="searched-body" ref={tripRef}>
                                            {
                                                data?.map((trip, index) => {
                                                    return <div className="searched-card" key={index}>
                                                        <img src={`${import.meta.env.VITE_BACKEND_URL}${trip?.photos?.[0]?.path}`} alt="card_img" />
                                                        <div className="trip-detail">
                                                            <h4>Place</h4>
                                                            <div className="date-seats">
                                                                <p>Starts from {format((trip.startDate) as string, "LLL dd, yyyy")}</p>
                                                                <p> {trip?.leftSeats} Seats left</p>
                                                            </div>
                                                            <h6 onClick={() => {
                                                                if (registerChildRef.current && !user) {
                                                                    registerChildRef.current.handleShow()
                                                                }else{
                                                                    navigate("/dashboard/all-trip")
                                                                }
                                                            }}>View details</h6>
                                                        </div>
                                                    </div>

                                                })
                                            }

                         
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RegisterModal ref={registerChildRef} loginRef={loginChildRef} />
            <LoginModal ref={loginChildRef} registerRef={registerChildRef} />
        </>
    )
}

export default Header