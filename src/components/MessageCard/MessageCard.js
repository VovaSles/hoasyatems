import React from 'react';
import { Accordion, Card, Button } from "react-bootstrap";


function MessageCard(props) {
    const { message, index } = props;

    return (
        <div className="animate-falldown mt-3">
            <Card >
                <Accordion.Toggle as={Card.Header} eventKey={message.id}  className="d-flex justify-content-between align-items-center">
                    {message.creatorName}
                    
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={message.id}>
                    <Card.Body  className="d-flex justify-content-between align-items-center">{message.title}
                        <Card.Text>{message.createdAt.toString().slice(4, 10)}</Card.Text>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </div>
    )
}

export default MessageCard
