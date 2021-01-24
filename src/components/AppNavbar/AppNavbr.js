import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';


function AppNavbr(props) {
    const { activeUser, onLogout } = props;

    return (
        <div className="fixed-top">
        <Navbar className="d-flex justify-content-between align-items-center" bg="light" expand="lg">
            <Navbar.Brand  href="/">HOA Systems</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

               
                <Nav className="ml-auto align-items-center">
                    {activeUser && activeUser.isAdmin ? <Link  to="/users"><Button className="m-3" variant="success" type="button">Tenants</Button></Link> : null}
                    {activeUser ? <Link  to="/messages"><Button className="m-3" variant="success" type="button">Messages</Button></Link> : null}
                    {activeUser ? <Link  to="/votings"><Button className="m-3" variant="success" type="button">Votings</Button></Link> : null}
                    {activeUser ? null : <Link to="/login"><Button className="m-3" variant="success" type="button">Login</Button></Link>}
                    {activeUser ? null : <Link to="/signup"> <Button className="m-3" variant="success" type="button">Signup</Button></Link>}
                    {activeUser ? <Link  to="/" onClick={() => onLogout()}><Button className="m-3" variant="success" type="button">Logout</Button></Link> : null}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </div>
    )
}

export default AppNavbr;