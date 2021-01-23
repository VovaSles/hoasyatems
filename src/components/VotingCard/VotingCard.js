import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button ,Accordion} from 'react-bootstrap';
import { Chart } from "react-google-charts";
import Parse from 'parse';

function VotingCard (props) {
    const { user, voting } = props;
    const [voted, setVoted] = useState(false)
    


 
    const inFovor = async () => {
        const MyCustomClass = await Parse.Object.extend('voiting');
        const query = new Parse.Query(MyCustomClass);
        // here you put the objectId that you want to update
         const parseVoting = await query.get(voting.id);
         parseVoting.set('votes', voting.votes.concat({"voteBy": user.id, "vote": "in fovor"}));
         const updatedParseVoting = await parseVoting.save();
         setVoted(true);
         console.log(updatedParseVoting);
    }
   
   

    
    const against = async () =>{ 
        const MyCustomClass =  Parse.Object.extend('voiting');
        const query = new Parse.Query(MyCustomClass);
        // here you put the objectId that you want to update
         const parseVoting = await query.get(voting.id);
         parseVoting.set('votes', voting.votes.concat({"voteBy": user.id, "vote": "against"}));
         const updatedParseVoting = await parseVoting.save();
         setVoted(true);
         console.log(updatedParseVoting);
        }

    return (
        <div>
            <Card>
            <Accordion.Toggle as={Card.Header} eventKey={voting.id}  className="d-flex justify-content-between align-items-center">
            {voting.title}
                   {/*  <AccessAlarmIcon/> */}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={voting.id}>
                    <Card.Body  className="d-flex justify-content-between align-items-center">
                    <Row>
                        <p className="p-2">{voting.details}</p>

                        <Col className="d-flex justify-content-center align-items-center" >
                            <Chart
                                width={'300px'}
                                height={'200px'}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['Task', 'Hours per Day'],
                                    ['In Fovor', voting.votes.filter(vote => vote.vote === "in fovor").length],
                                    ['Against', voting.votes.filter(vote => vote.vote === "against").length],

                                ]}
                                options={{
                                    title: voting.title,
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />
                        </Col>
                        <Col>
                        {voting.votes.filter(vote => vote.voteBy === user.id).length ? <h3 >Thank you for your vote.</h3> :
                            <div>
                                <Button className="m-4" variant="primary" onClick={inFovor}>In Fovor</Button>
                                <Button className="m-4" variant="danger" onClick={against}>Against</Button>
                            </div>}
                            </Col>
                    </Row>
                    </Card.Body>
                </Accordion.Collapse>

            </Card>
        </div>
    )
}

export default VotingCard
