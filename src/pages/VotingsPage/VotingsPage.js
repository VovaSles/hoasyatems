import { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import VotingCard from "../../components/VotingCard/VotingCard";
import Parse from 'parse';
import VotingModel from "../../model/VotingModel";
import AppNavbr from "../../components/AppNavbar/AppNavbr";

function VotingsPage(props) {
    const { activeUser, onLogout } = props;
    const [showModal, setShowModal] = useState(false);
    const [votings, setVotings] = useState([]);


    //fetching votings from parse
    useEffect(()=> {
        async function fetchData() {
            const ParseVoting = Parse.Object.extend('voiting');
            const query = new Parse.Query(ParseVoting);
            query.equalTo("buildingId", activeUser.buildingId);
            const ParseVotings = await query.find();
            setVotings(ParseVotings.map(parseVoting => new VotingModel(parseVoting)));
        }

        if (activeUser) {
            fetchData()
        }
    }, [activeUser])


    if (!activeUser) {
        return <Redirect to="/" />
    }
    //users votings
    const usersVotingView = votings.map(voting => <Col className="m-3" key={voting.id} lg={8} md={12}><VotingCard key={voting.id} voting={voting} user={activeUser} /></Col>)
   
    return (
        <div>
              <AppNavbr activeUser={activeUser} onLogout={onLogout} />
            <Row>
                <Col sm={12}  md={6}>
                <h2 className="text-center">Active voiting</h2>
                {usersVotingView}
                </Col >
                <Col sm={12} md={6}>
                   <h2 className="text-center">Voiting results</h2>
                </Col>
            </Row>
        </div>
    )
}

export default VotingsPage
