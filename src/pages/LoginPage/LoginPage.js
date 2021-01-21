import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import './LoginPage.css';
import Parse from 'parse';
import UserModel from "../../model/UserModel";
import AppNavbr from "../../components/AppNavbar/AppNavbr";

function LoginPage(props) {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [showLoginError, setShowLoginError] = useState(false);
    const [redirectToUsers, setRedirectToUsers] = useState(false);
    const { activeUser, onLogin } = props;

    async function login() {

        try {
            const parseUser = await Parse.User.logIn(email, pwd);
            // Trigger onLogin event prop + update redirect state so we will redirect to recipes page
            onLogin(new UserModel(parseUser));
            setRedirectToUsers(true);
        } catch (error) {
            // show an error alert
            console.error('Error while logging in user', error);
            setShowLoginError(true);
        }
    }


    if (redirectToUsers) {
        return <Redirect to="/users" />;
    }

    return (
        <>

            <div className="p-login ">
                <br></br>
                <br></br>
                <Link  to="/"> <h2 className="text-center">Login to HOA Systems</h2></Link>

                <p className="text-center">or <Link to="/signup">create an account</Link></p>
                {showLoginError ? <Alert variant="danger">Invalid Credentials!</Alert> : null}
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={pwd} onChange={e => setPwd(e.target.value)} />
                    </Form.Group>

                    <Button className="mt-5" variant="success" type="button" block onClick={login}>
                        Login
                </Button>
                </Form>
            </div>
        </>
    )

}

export default LoginPage;