import React, { useState, useEffect } from 'react'
import AppNavbr from "../../components/AppNavbar/AppNavbr";
import { Redirect } from "react-router-dom";
import Parse from 'parse';
import { Container, Form, FormControl, Button, Accordion     } from "react-bootstrap";
import MessageModel from '../../model/MessageModel';
import MessageCard from '../../components/MessageCard/MessageCard';

function MessagesPage(props) {
    const { activeUser, onLogout } = props;
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");


    //fetching messages from parse
    useEffect(() => {
        async function fetchData() {
            const ParseMessage = Parse.Object.extend('message');
            const query = new Parse.Query(ParseMessage);
            query.equalTo("buildingId", activeUser.buildingId);
            const ParseMessages = await query.find();
            setMessages(ParseMessages.map(parseMessage => new MessageModel(parseMessage)));
        }

        if (activeUser) {
            fetchData()
        }
    }, [activeUser])

    //adding new message
    async function addMessage(message) {
        const ParseMessage = Parse.Object.extend('message');
        const newMessage = new ParseMessage();
        newMessage.set('title', messageText);
        newMessage.set('createdBy', activeUser.id);
        newMessage.set('creatorName', activeUser.username);
        newMessage.set('buildingId', activeUser.buildingId);


        const parseMessage = await newMessage.save();
        setMessageText("")
        setMessages(messages.concat(new MessageModel(newMessage)));
    }



    if (!activeUser) {
        return <Redirect to="/" />
    }


    //messages view 
    const messagesView = messages.map((message, index) => <MessageCard key={message.id} message={message} user={activeUser} index={index} />)

    return (
        <div>
            <AppNavbr activeUser={activeUser} onLogout={onLogout} />

            <Container>
                <h1 className="text-center">Messages</h1>
                
            <Form className=" w-100 mb-5 mt-5 " inline>
                <FormControl
                    className=" w-50"
                    type="text"
                    placeholder="Write your message ...."
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)} />
                <Button className="ml-5" variant="warning" onClick={addMessage}>Send</Button>
            </Form>

           <Accordion>{messagesView}</Accordion> 
            </Container>
        </div>
    )
}
export default MessagesPage
