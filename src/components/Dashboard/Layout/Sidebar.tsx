import Sidebar from "react-bootstrap-sidebar-menu";

const DashboardSidebar = () => {
    return <>
        <Sidebar expand="md" className="vh-100">
            <Sidebar.Collapse getScrollValue={500}>
                <Sidebar.Header>
                    <Sidebar.Nav.Title><h1 className="text-primary m-0"><i className="fa fa-map-marker-alt me-3"></i></h1></Sidebar.Nav.Title>
                    <Sidebar.Toggle className="text-black btn common-ty-btn"><i className="fas fa-bars"></i></Sidebar.Toggle>
                </Sidebar.Header>
                <Sidebar.Body>
                    <Sidebar.Nav>

                    </Sidebar.Nav>
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