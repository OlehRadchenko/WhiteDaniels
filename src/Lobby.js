import { useLocation } from 'react-router-dom';
import Blackjack  from './Blackjack2';
import { useRef, useState } from 'react';
import { Button } from '@mui/material';

const Lobby = () => {
    const location = useLocation();
    const { imie } = location.state;
    const socket = useRef();
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);

    const connect = () => {
        socket.current = new WebSocket('ws://localhost:5000');

        socket.current.onopen = () => {
            console.log('Websocket connected');
            setConnected(true);
            const message = {
                type: 'connection',
                imie: imie,
                id: Date.now(),
                time: new Date().toLocaleString()
            }
            socket.current.send(JSON.stringify(message));
        }
        socket.current.onclose = () => {
            console.log('Websocket closed');
            setConnected(false);
            /*const message = {
                type: 'closed',
                imie: imie,
                id: Date.now(),
                time: new Date().toLocaleString()
            }
            socket.current.send(JSON.stringify(message)); MIAŁO DZIAŁAĆ A NIE DZIAŁA XDDD*/
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, message]);
        }

        socket.current.onerror = (error) => {
            console.log('Websocket error');
            console.log(error);
        }
    }
    return (
        <>
            {connected ? <Blackjack imie={imie} chatMessages={messages} socket={socket}/> : <Button variant="contained" color="success" onClick={connect}>Wejdź do gry jako: {imie}</Button>}
        </>
    )
}
export default Lobby;