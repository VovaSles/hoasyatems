import { Navbar, Nav, Button } from "react-bootstrap";
import {Link} from 'react-router-dom';


function AppNavbr(props) {
    const {activeUser, onLogout} = props;

    return (
        <Navbar className="d-flex justify-content-between align-items-center" bg="light" expand="lg">
        <Navbar.Brand href="/">APP LOGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                {activeUser ? <Link to="/users">Users</Link> : null}
            </Nav>
            <Nav className="ml-auto align-items-center">
                {activeUser ? null : <Link to="/login"><Button className="m-3" variant="success" type="button">Login</Button></Link>}
                {activeUser ? null : <Link to="/signup"> <Button variant="success" type="button">Signup</Button></Link>}
                {activeUser ? <Link to="/" onClick={() => onLogout()}>Logout</Link> : null}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    )
}

export default AppNavbr;