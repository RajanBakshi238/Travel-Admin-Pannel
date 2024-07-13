import "./../../../style.scss"
import { Container, Navbar } from "react-bootstrap";
import DashboardSidebar from "./Sidebar";
import Main from "./Main";
import { Outlet } from "react-router-dom";
export default function Layout() {
    return <div className="dashboard-ty layout-ty"><div className="main-wrapper">

        <Navbar className="main-header" expand="lg" >
            <Container fluid>
                <Navbar.Brand href="#home" className="text-primary">Register As</Navbar.Brand>
            </Container>
        </Navbar>
        <DashboardSidebar />
        <Main>


            <Outlet />
        </Main></div></div>;
}
