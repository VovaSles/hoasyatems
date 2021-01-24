import { useState, useEffect } from "react";
import { Button, Col, Container, Row, Accordion } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import VotingCard from "../../components/VotingCard/VotingCard";
import Parse from 'parse';
import VotingModel from "../../model/VotingModel";
import AppNavbr from "../../components/AppNavbar/AppNavbr";
import NewVotingModal from '../../components/NewVotingModal/NewVotingModal';

function VotingsPage(props) {
    const { activeUser, onLogout } = props;
    const [showModal, setShowModal] = useState(false);
    const [votings, setVotings] = useState([]);///????????

const setVotingsCallback =(voting, votes) =>{
    voting.votes = votes;

    // 1) Duplicate votings object
    const updatedVoting = {...voting};

    // 2) find index of voting
     const index = votings.indexOf(voting);

    // 3) replace the object in the above index with the updatedVoting
     votings[index] = updatedVoting;

     setVotings([...votings]);

}

    //fetching votings from parse
    useEffect(() => {
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


    //adding new voting
   async function addVoting(title, details) {

        const ParseVoting = Parse.Object.extend('voiting');
        const newVoting = new ParseVoting();
        newVoting.set('title', title);
        newVoting.set('details', details);
        newVoting.set('options', ["in fovor", "against"]);
        newVoting.set('votes', []);
        newVoting.set('buildingId', activeUser.buildingId);
        const parseVoting = await newVoting.save();
        setVotings(votings.concat(new VotingModel(parseVoting)));
    }

    if (!activeUser) {
        return <Redirect to="/" />
    }
    //users votings
    const usersVotingView = votings.map(voting => <Col className="m-3" key={voting.id} ><VotingCard key={voting.id} voting={voting} user={activeUser} callback={setVotingsCallback} /></Col>)

    return (
        <div>
            <AppNavbr activeUser={activeUser} onLogout={onLogout} />
            <Container style={{marginTop: "100px"}}>
            
                <Row>
                    <Col className="d-flex justify-content-center align-items-center">
                        {activeUser.isAdmin ? <Button  variant="warning" onClick={() => setShowModal(true)}> Add Voting</Button> : null}
                    </Col>
                    <Col >
                      
                        <Accordion>{usersVotingView}</Accordion>
                    </Col >
                </Row>
            </Container>
            <NewVotingModal show={showModal} handleClose={() => setShowModal(false)} addVoting={addVoting} />
        </div>
    )
}

export default VotingsPage
