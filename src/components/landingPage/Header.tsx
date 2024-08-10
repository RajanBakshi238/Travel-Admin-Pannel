import { useCallback, useEffect, useRef, useState } from "react";
import RegisterModal from "../Authentication/registerModel";
import LoginModal from "../Authentication/loginModel";
import { useUserContext } from "../../context/User";
import { NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

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

    console.log(user, ">>>>>> ser")

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
                            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                                <h1 className="display-3 text-white mb-3 animated slideInDown">Enjoy Your Vacation With Us</h1>
                                <p className="fs-4 text-white mb-4 animated slideInDown">Tempor erat elitr rebum at clita diam amet diam et eos erat ipsum lorem sit</p>
                                <div className="position-relative w-75 mx-auto animated slideInDown">
                                    <input className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5" type="text" placeholder="Eg: Thailand" />
                                    <button type="button" className="btn btn-primary rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2" style={{ "marginTop": "7px" }}>Search</button>
                                </div>
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