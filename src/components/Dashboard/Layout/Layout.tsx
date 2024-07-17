import "./../../../style.scss"
import { Container, Navbar } from "react-bootstrap";
import DashboardSidebar from "./Sidebar";
import Main from "./Main";
import { Outlet, useLocation } from "react-router-dom";
import { RouteToPageMapper } from "./RouteToPageNameMapper";
export default function Layout() {
    const location = useLocation();
    const { pathname } = location


    return <div className="dashboard-ty layout-ty"><div className="main-wrapper">

        <Navbar className="main-header" expand="lg" >
            <Container fluid>
                <Navbar.Brand href="#home" className="text-primary">
                {RouteToPageMapper?.[pathname] ?? "Lost"}
                </Navbar.Brand>
            </Container>
        </Navbar>
        <DashboardSidebar />
        <Main>


            <Outlet />
        </Main></div></div>;
}
