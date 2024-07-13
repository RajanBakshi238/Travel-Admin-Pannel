import { Navbar, Container } from "react-bootstrap";
import Sidebar from "react-bootstrap-sidebar-menu";
import Layout from '../../components/Layout/Layout';
import Main from '../../components/Layout/Main';

const Dashboard = () => {

    const theme = "dark";
    return (
        <Layout>
            <Navbar className="main-header" expand="lg" bg={theme} variant={theme}>
                <Container fluid>
                    <Navbar.Brand href="#home">Brand link</Navbar.Brand>
                </Container>
            </Navbar>
            <Sidebar variant={theme} bg={theme} expand="sm">
                <Sidebar.Collapse getScrollValue={500}>
                    <Sidebar.Header>
                        <Sidebar.Brand>Logo</Sidebar.Brand>
                        <Sidebar.Toggle />
                    </Sidebar.Header>
                    <Sidebar.Body>
                        <Sidebar.Nav>
                            <Sidebar.Nav.Link eventKey="menu_title">
                                <Sidebar.Nav.Icon>1</Sidebar.Nav.Icon>
                                <Sidebar.Nav.Title>Menu Title</Sidebar.Nav.Title>
                            </Sidebar.Nav.Link>
                            <Sidebar.Sub eventKey={0}>
                                <Sidebar.Sub.Toggle>
                                    <Sidebar.Nav.Icon />
                                    <Sidebar.Nav.Title>Submenu</Sidebar.Nav.Title>
                                </Sidebar.Sub.Toggle>
                                <Sidebar.Sub.Collapse>
                                    <Sidebar.Nav>
                                        <Sidebar.Nav.Link eventKey="sum_menu_title">
                                            <Sidebar.Nav.Icon>1.1</Sidebar.Nav.Icon>
                                            <Sidebar.Nav.Title>Sub menu item</Sidebar.Nav.Title>
                                        </Sidebar.Nav.Link>
                                    </Sidebar.Nav>
                                </Sidebar.Sub.Collapse>
                            </Sidebar.Sub>
                        </Sidebar.Nav>
                    </Sidebar.Body>
                </Sidebar.Collapse>
            </Sidebar>
            <Main>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
                    dicta minima molestiae nesciunt repellendus ipsum. Itaque culpa
                    expedita vero repellendus ullam. Repellat, fugit quibusdam? Totam
                    accusantium officiis velit unde sequi. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Incidunt dicta minima molestiae nesciunt
                    repellendus ipsum. Itaque culpa expedita vero repellendus ullam.
                    Repellat, fugit quibusdam? Totam accusantium officiis velit unde
                    sequi.
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
                    eligendi, ad rerum unde corporis exercitationem aut, ipsam et
                    doloremque consectetur similique magni odio fugiat totam provident,
                    sit sunt omnis dicta. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Neque quae delectus, cum provident laboriosam at.
                    Repudiandae esse veniam quam, reiciendis et facilis blanditiis ut
                    optio eligendi dignissimos quas sed voluptate?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
                    eligendi, ad rerum unde corporis exercitationem aut, ipsam et
                    doloremque consectetur similique magni odio fugiat totam provident,
                    sit sunt omnis dicta. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Neque quae delectus, cum provident laboriosam at.
                    Repudiandae esse veniam quam, reiciendis et facilis blanditiis ut
                    optio eligendi dignissimos quas sed voluptate?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
                    eligendi, ad rerum unde corporis exercitationem aut, ipsam et
                    doloremque consectetur similique magni odio fugiat totam provident,
                    sit sunt omnis dicta. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Neque quae delectus, cum provident laboriosam at.
                    Repudiandae esse veniam quam, reiciendis et facilis blanditiis ut
                    optio eligendi dignissimos quas sed voluptate?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
                    eligendi, ad rerum unde corporis exercitationem aut, ipsam et
                    doloremque consectetur similique magni odio fugiat totam provident,
                    sit sunt omnis dicta. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Neque quae delectus, cum provident laboriosam at.
                    Repudiandae esse veniam quam, reiciendis et facilis blanditiis ut
                    optio eligendi dignissimos quas sed voluptate?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
                    eligendi, ad rerum unde corporis exercitationem aut, ipsam et
                    doloremque consectetur similique magni odio fugiat totam provident,
                    sit sunt omnis dicta. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Neque quae delectus, cum provident laboriosam at.
                    Repudiandae esse veniam quam, reiciendis et facilis blanditiis ut
                    optio eligendi dignissimos quas sed voluptate?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
                    eligendi, ad rerum unde corporis exercitationem aut, ipsam et
                    doloremque consectetur similique magni odio fugiat totam provident,
                    sit sunt omnis dicta. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Neque quae delectus, cum provident laboriosam at.
                    Repudiandae esse veniam quam, reiciendis et facilis blanditiis ut
                    optio eligendi dignissimos quas sed voluptate?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
                    eligendi, ad rerum unde corporis exercitationem aut, ipsam et
                    doloremque consectetur similique magni odio fugiat totam provident,
                    sit sunt omnis dicta. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Neque quae delectus, cum provident laboriosam at.
                    Repudiandae esse veniam quam, reiciendis et facilis blanditiis ut
                    optio eligendi dignissimos quas sed voluptate?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
                    eligendi, ad rerum unde corporis exercitationem aut, ipsam et
                    doloremque consectetur similique magni odio fugiat totam provident,
                    sit sunt omnis dicta. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Neque quae delectus, cum provident laboriosam at.
                    Repudiandae esse veniam quam, reiciendis et facilis blanditiis ut
                    optio eligendi dignissimos quas sed voluptate?
                </p>
            </Main>
        </Layout>
    );



}

export default Dashboard