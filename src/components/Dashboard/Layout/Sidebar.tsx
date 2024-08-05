import Sidebar from "react-bootstrap-sidebar-menu";
import './layout.scss'
import { useUserContext } from "../../../context/User";
import { ADMIN, ORGANIZER } from "../../../contracts/constants/roleConstant";
import { Link } from "react-router-dom";
const DashboardSidebar = () => {
    const { user } = useUserContext()
    console.log(user, ">>>>> user")
    return <>
        <Sidebar expand="sm" className="vh-100 dashboard-sidebar">
            <Sidebar.Collapse className="sidebar-width" getScrollValue={200}>
                <Sidebar.Header>
                    <Sidebar.Nav.Title><h1 className="text-primary m-0"><i className="fa fa-map-marker-alt me-3"></i></h1></Sidebar.Nav.Title>
                    <Sidebar.Toggle className="text-black btn common-ty-btn"><i className="fas fa-bars"></i></Sidebar.Toggle>
                </Sidebar.Header>
                <Sidebar.Body className="sidebar-body">
                    {user?.role === ORGANIZER ? <>
                        {user?.isVerified ? <>
                            <Sidebar.Nav>
                                {/* <Sidebar.Nav.Icon>1</Sidebar.Nav.Icon> */}
                                <Link to="/dashboard">
                                    <Sidebar.Nav.Title className="sidebar-item">Create Trip</Sidebar.Nav.Title>
                                </Link>
                            </Sidebar.Nav>
                            <Sidebar.Nav className="mt-4">
                                {/* <Sidebar.Nav.Icon>1</Sidebar.Nav.Icon> */}
                                <Link to="/dashboard/my-trip">
                                    <Sidebar.Nav.Title className="sidebar-item">My Trip</Sidebar.Nav.Title>
                                </Link>
                            </Sidebar.Nav>
                            <Sidebar.Nav className="mt-4">
                                <Link to="/dashboard/bookings">
                                    <Sidebar.Nav.Title className="sidebar-item">Bookings</Sidebar.Nav.Title>
                                </Link>
                            </Sidebar.Nav>
                        </> : <></>}
                    </> :
                        user?.role === ADMIN ? <>

                            <Sidebar.Nav className="mt-4">
                                {/* <Sidebar.Nav.Icon>1</Sidebar.Nav.Icon> */}
                                <Link to="/dashboard/organizer">
                                    <Sidebar.Nav.Title className="sidebar-item">Organizers</Sidebar.Nav.Title>
                                </Link>
                            </Sidebar.Nav>
                            <Sidebar.Nav className="mt-4">
                                <Link to="/dashboard/bookings">
                                    <Sidebar.Nav.Title className="sidebar-item">Bookings</Sidebar.Nav.Title>
                                </Link>
                            </Sidebar.Nav>
                        </>
                            : <>
                                <Sidebar.Nav className="mt-4">
                                    {/* <Sidebar.Nav.Icon>1</Sidebar.Nav.Icon> */}
                                    <Link to="/dashboard/trip">
                                        <Sidebar.Nav.Title className="sidebar-item">Trip</Sidebar.Nav.Title>
                                    </Link>
                                </Sidebar.Nav>
                                <Sidebar.Nav className="mt-4">
                                <Link to="/dashboard/bookings">
                                    <Sidebar.Nav.Title className="sidebar-item">Bookings</Sidebar.Nav.Title>
                                </Link>
                            </Sidebar.Nav>
                            </>}


                </Sidebar.Body>
            </Sidebar.Collapse>
        </Sidebar>
    </>
}

export default DashboardSidebar


// <Sidebar.Nav.Link eventKey="menu_title">
// <Sidebar.Nav.Icon>1</Sidebar.Nav.Icon>
// <Sidebar.Nav.Title>Menu Title</Sidebar.Nav.Title>
// </Sidebar.Nav.Link>
// <Sidebar.Sub eventKey={0}>
// <Sidebar.Sub.Toggle>
//     <Sidebar.Nav.Icon />
//     <Sidebar.Nav.Title>Submenu</Sidebar.Nav.Title>
// </Sidebar.Sub.Toggle>
// <Sidebar.Sub.Collapse>
//     <Sidebar.Nav>
//         <Sidebar.Nav.Link eventKey="sum_menu_title">
//             <Sidebar.Nav.Icon>1.1</Sidebar.Nav.Icon>
//             <Sidebar.Nav.Title>Sub menu item</Sidebar.Nav.Title>
//         </Sidebar.Nav.Link>
//     </Sidebar.Nav>
// </Sidebar.Sub.Collapse>
// </Sidebar.Sub>