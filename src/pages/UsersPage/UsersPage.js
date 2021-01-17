import { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import NewUserModal from "../../components/NewUserModal/NewUserModal";
import UserCard from "../../components/UserCard/UserCard";
import Parse from 'parse';
import UserModel from "../../model/UserModel";
import AppNavbr from "../../components/AppNavbar/AppNavbr";



function UsersPage(props) {
    const { activeUser, onLogout } = props;
    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState([]);

    //fetching users from parse
    useEffect(()=> {
        async function fetchData() {
            const ParseUser = Parse.Object.extend('User');
            const query = new Parse.Query(ParseUser);
            query.equalTo("buildingId", activeUser.buildingId);
            const ParseUsers = await query.find();
            setUsers(ParseUsers.map(parseUser => new UserModel(parseUser)));
        }

        if (activeUser) {
            fetchData()
        }
    }, [activeUser])
    //adding new user
    async function addUser(username, email, apartment) {
        const ParseUser = Parse.Object.extend('User');
        const newUser = new ParseUser();
        
        newUser.set('username', username);
        newUser.set('email', email);
        newUser.set('password', email);
        newUser.set('apartment', apartment);
        newUser.set('buildingId', activeUser.buildingId);
        newUser.set('isAdmin', false);
        
        const parseUser = await newUser.save();
        setUsers(users.concat(new UserModel(parseUser)));
    }

    if (!activeUser) {
        return <Redirect to="/" />
    }
    //users view without admin 
    const usersView = users.filter(user => user.isAdmin === false).map(user => <Col className="m-3" key={user.id} lg={8} md={12}><UserCard key={user.id} user={user} /></Col>)

    return (
        <div>
            <AppNavbr activeUser={activeUser} onLogout={onLogout} />
            <Container className="d-flex justify-content-center align-items-center">
                <div className="heading">
                    <h2>Welcome :</h2>      
                  <h2>{activeUser.username}</h2>
                    <Button className="m-5" variant="secondary" onClick={() => setShowModal(true)}> Add User</Button>
                </div>
                <Row>
                    {usersView.length ? usersView : "You have no users, maybe create one..."}
                </Row>
            </Container>
            <NewUserModal show={showModal} handleClose={() => setShowModal(false)} addUser={addUser} />
        </div>
    )
}

export default UsersPage
