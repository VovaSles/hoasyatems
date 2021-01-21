import React from 'react';
import { Accordion, Card, Container } from "react-bootstrap";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

function MessageCard(props) {
    const { message, key} = props;
  
    return(
        <>
           
        <Card>
          <Card.Body>
          {message.creatorName} <AccessAlarmIcon color="secondary"/>
               <Card.Text >{message.title}</Card.Text>
               </Card.Body> 
               <Card.Footer className="text-muted">{message.createdAt.toString().slice(4, 10)}</Card.Footer> 
         
        </Card>
  
           
        </>
    )
}

export default MessageCard
