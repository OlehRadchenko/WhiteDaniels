import React, { useState } from 'react';
import './TextStyles.css';
import Input from '@mui/material/Input';
import { Button } from '@mui/material';

const MessageInfo = ({message, messages, socket, imie}) => {
    const [messageValue, setMessageValue] = useState('');

    const sendMessage = (value, imie) => {
        const message = {
            type: 'message',
            imie: imie,
            id: Date.now(),
            time: new Date().toLocaleString(),
            message: value
        }
        socket.current.send(JSON.stringify(message));
    }
    return (
        <div className="messageInfo">
            <div><p>{message}</p></div>
            <div id="chat">
                <h3>{messages.map((msg, index) => msg.type === 'connection' ? <p key={index}>[{msg.time}] {msg.imie} dołączył do stołu</p> : <p key={index}>[{msg.time}]{msg.imie} : {msg.message}</p>)}</h3>
                {console.log(messages)}
                <Input placeholder="Wiadomość" onChange={(e) => setMessageValue(e.target.value)}/><Button variant="contained" color="success" onClick={() => sendMessage(messageValue, imie)}>Wyślij</Button>
            </div>
        </div>
    );
}

export default MessageInfo;
