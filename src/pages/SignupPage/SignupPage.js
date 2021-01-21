import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Parse from 'parse';
import AppNavbar from '../../components/AppNavbar/AppNavbr';
import UserModel from "../../model/UserModel";

function SignupPage(props) {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [username, setUsername] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [apartment, setApartment] = useState("");
    const [buildingId, setSetBuildingId] = useState("");

    const [showSignupError, setShowSignupError] = useState(false);
    const [redirectToUsers, setRedirectToUsers] = useState(false);
    const { activeUser, onLogin } = props;


    async function Signup() {
        // Create a new instance of the building class
        const Building = await Parse.Object.extend('building');
        const building = new Building();
        building.set('city', city);
        building.set('street', street);
        building.set('number', number);
        const newBuilding = await building.save();
        //ask at Nir about this
        
        // Create a new instance of the user class
        const user = new Parse.User();
        user.set("username", username);
        user.set("password", pwd);
        user.set("email", email);
        user.set("isAdmin", true);
        user.set("buildingId", building.id);
        setSetBuildingId(building.id)
        user.set("apartment", apartment);
        try{
            const parseUser = await user.signUp()
            onLogin(new UserModel(parseUser));
            setRedirectToUsers(true);
        } catch (error) {
            setShowSignupError(true);
            const building = Parse.Object.extend('building');
            const query = new Parse.Query(building);
            // here you put the objectId that you want to delete
            const object = await query.get(buildingId);
            const response = await object.destroy();
            console.log(response )
               
      
 
        }
}




if (redirectToUsers) {
    return <Redirect to="/users" />;
}

return (
    <>
        <AppNavbar activeUser={activeUser} />
        <div className="p-login">
            <h1>Sign up to Home App</h1>
            {showSignupError ? <Alert variant="danger">Invalid Credentials!</Alert> : null}
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={pwd} onChange={e => setPwd(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicUsername">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="user Name" value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <div  className="d-flex justify-content-between align-items-center">
                <Form.Group controlId="formBasicUserCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicUserStreet">
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="text" placeholder="Street" value={street} onChange={e => setStreet(e.target.value)} />
                </Form.Group>
                </div>
                <div  className="d-flex justify-content-between align-items-center">
             

                <Form.Group controlId="formBasicUserHomeNumber">
                    <Form.Label>Building number</Form.Label>
                    <Form.Control type="text" placeholder="Building number" value={number} onChange={e => setNumber(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicUserHomeNumber">
                    <Form.Label>Apartment number</Form.Label>
                    <Form.Control type="text" placeholder="Apartment number" value={apartment} onChange={e => setApartment(e.target.value)} />
                </Form.Group>
                </div>
                <Button variant="success" type="button" block onClick={Signup}>
                    Sign up
                </Button>
            </Form>
        </div>
    </>
)

}

export default SignupPage;