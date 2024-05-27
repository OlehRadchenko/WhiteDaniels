import { useState } from "react";
import BalanceInfo from './BalanceInfo';
import MessageInfo from './MessageInfo';
import Hand from './Hand';
import Buttons from './Buttons';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

const Blackjack = () =>{
    const location = useLocation();
    const { user } = location.state;

    const socket = io('http://localhost:5000');

    const GameState = {
        betTime : 'betTime',
        userTurn: 'userTurn',
        dealerTurn: 'dealerTurn',
        start: 'start'
    };

    const [gameState, setGameState] = useState(GameState.betTime);

    const [dealerCards, setDealerCards] = useState([]);
    const [dealerScore, setDealerScore] = useState(0);

    const [activeUsers, setActiveUsers] = useState([]);
    const [userTurn, setUserTurn] = useState(false);

    const [balance, setBalance] = useState(10000);

    const [message, setMessage] = useState('');
    const [buttonsState, setButtonsState] = useState({
        hitDisabled: false,
        standDisabled: false,
        doubleDisabled: false,
        surrenderDisabled: false,
        newGameDisabled: true
    });

    const setGameSettings = (data) => {
        setDealerCards(data.dealer.cards);
        setDealerScore(data.dealer.score);
        setActiveUsers(data.usersActive);
        setGameState(data.gameState);
        socket.emit('giveButtonState', {user: user});
    };

    socket.on('playGame_success', (data) =>  {
        console.log(data); //
        setGameSettings(data);
    });

    socket.on('giveButtonState_success', (data) => {
        setButtonsState(data.buttons);
        setMessage(data.mess);
        setUserTurn(data.userTurn);
    });

    socket.on('hit_success', (data) => {
        console.log(data); //
        setGameSettings(data);
    });
    socket.on('stand_success', (data) => {
        console.log(data); //
        setGameSettings(data);
    });
    socket.on('double_success', (data) => {
        console.log(data);
        setGameSettings(data);
    });
    socket.on('surrender_success', (data) => {
        console.log(data);
        setGameSettings(data);
    });
    socket.on('restartGame_success', (data) => {
        setGameSettings(data);
    });
    socket.on('restartGame_50_success', (data) => {
        if(data.user.user.email === user.email){
            setBalance(data.user.balance);
        }
        setGameSettings(data);
    });
    
    return(
        <div id="Blackjack">
            <div id="topContainer">
            <img id="logoGame" src={require('./icons/logo.png')} alt='logo'/>
                <BalanceInfo balance={balance} style="font-size: 50px"/>
            </div>
            <div id="menu">
                <div>
                    <div style={{textAlign: 'center', fontSize: '21px'}}>
                        BLACKJACK PAYS 3 TO 2. DEALER MUST STAND ON 17 AND DRAW TO 16
                    </div>
                    <Hand title="Dealer's Hand" cards={dealerCards} actualScore={dealerScore}/>                         
                    <div style={{display : 'flex', flexDirection : 'row', alignContent: 'space-between', gap : '50px', justifyContent: 'center'}}>
                    {activeUsers.map((activeUser) => {
                        return (
                            <Hand title={activeUser.user.imie+"'s Hand"} cards={activeUser.PlayerCards} actualScore={activeUser.PlayerScore} key={activeUser.socketId}/>  
                        );
                    })}
                    </div>
                    <div style={{display : 'flex', flexDirection : 'row', alignContent: 'space-between', gap : '50px', justifyContent: 'center'}}>
                    <Buttons 
                        balance={balance} 
                        setBalance={setBalance} 
                        gameState={gameState} 
                        hitState={buttonsState.hitDisabled} 
                        standState={buttonsState.standDisabled} 
                        doubleState={buttonsState.doubleDisabled} 
                        surrenderState={buttonsState.surrenderDisabled} 
                        newGameState={buttonsState.newGameDisabled}
                        userTurn={userTurn}
                        user={user}/> 
                    
                    </div>
                    <MessageInfo message={message} />
                </div>
            </div>
        </div>
    )
}
export default Blackjack;