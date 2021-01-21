import { Button } from 'bootstrap';
import React from 'react'
import { Card } from 'react-bootstrap';

function VoitingResultsCard(props) {
    const { user, voting } = props;
    return (
        <div>
            <Card>
                <Card.Header>
                  {voting.title}
                </Card.Header>
                <Card.Body>
                    {voting.details}
                </Card.Body>
                <Card.Footer>
                    <Button variant="warning">In Favor</Button>
                    <Button variant="danger">Against</Button>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default VoitingResultsCard
