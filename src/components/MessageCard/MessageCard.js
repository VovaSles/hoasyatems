import React from 'react';
import { Accordion, Card, Button } from "react-bootstrap";
import AnnouncementIcon from '@material-ui/icons/Announcement';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';

function MessageCard(props) {
    const { message, index, user, callback } = props;
    

    return (
        <div className="animate-falldown mt-3">
            <Card >
                <Accordion.Toggle 
                 as={Card.Header}
                 className="d-flex justify-content-between align-items-center" 
                 eventKey={message.id} 
                  
                >
                    {message.creatorName}
                    
                   {message.seen.includes(user.id)? <SpeakerNotesOffIcon/> : <AnnouncementIcon color="secondary"/> }
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={message.id} >
                    <Card.Body  className="d-flex justify-content-between align-items-center">{message.title}
                        <Card.Text>{message.createdAt.toString().slice(4, 10)}</Card.Text>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </div>
    )
}

export default MessageCard
