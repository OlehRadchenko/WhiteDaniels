import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import './Buttons.css'; 
import './TextStyles.css';
import { io } from 'socket.io-client';
import { useNavigate } from "react-router-dom";

const Chips = styled(Button)(({ theme }) => ({
    width: '77px',
    height: '80px',
    border: 'none',
    position: 'relative',
    cursor: 'pointer',
    margin: '5px',
    padding: '0',
    background: 'none',
    transition: 'transform 0.15s ease-in-out, filter 0.15s ease-in-out',

    '&:hover': {
        transform: 'translateY(-10px)',
    },

    '&:disabled': {
        filter: 'grayscale(100%) brightness(0.5)',
        cursor: 'not-allowed',
    }
}));

const UtilityButtons = styled(Button)(({ theme }) => ({
    borderRadius: '50%',
    border: '2px solid white',
    minWidth: '0px',
}));

const Buttons = ({balance, setBalance, gameState, hitState, standState, doubleState, surrenderState, newGameState, userTurn, user}) => {
    const socket = io('http://localhost:5000');
    const navigate = useNavigate();
    
    socket.on('placeBet_success', (data) => {
        if(data.user.user.email === user.email) {
            setBetButtonState(true);
            setBalance(data.user.balance);
        }
    });
    socket.on('loan_success', (data) => {
        setLoanButtonState(true);
        setBalance(data.user_balance);
        setBalanceValue(data.user_balance);
        console.log(data);
    });

    socket.on('restartGame_50_success', (data) => {
        setBetButtonState(false);
        setLoanButtonState(false);
    });

    const [betValue, setBetValue] = useState(0);
    const [balanceValue, setBalanceValue] = useState(balance);
    const [betButtonState, setBetButtonState] = useState(false);
    const [loanButtonState, setLoanButtonState] = useState(false);

    const nominaly = [
        { wartosc: 5000, ilosc: 0, color: 'brown', image: require('./Chips/brown.png') },
        { wartosc: 2000, ilosc: 0, color: 'lightblue', image: require('./Chips/lightblue.png') },
        { wartosc: 1000, ilosc: 0, color: 'yellow', image: require('./Chips/yellow.png') },
        { wartosc: 500, ilosc: 0, color: 'purple', image: require('./Chips/purple.png') },
        { wartosc: 250, ilosc: 0, color: 'pink', image: require('./Chips/pink.png') },
        { wartosc: 100, ilosc: 0, color: 'black', image: require('./Chips/black.png') },
        { wartosc: 50, ilosc: 0, color: 'orange', image: require('./Chips/orange.png') },
        { wartosc: 25, ilosc: 0, color: 'green', image: require('./Chips/green.png') },
        { wartosc: 20, ilosc: 0, color: 'gray', image: require('./Chips/gray.png') },
        { wartosc: 10, ilosc: 0, color: 'blue', image: require('./Chips/blue.png') },
        { wartosc: 5, ilosc: 0, color: 'red', image: require('./Chips/red.png') },
        { wartosc: 1, ilosc: 0, color: 'white', image: require('./Chips/white.png') }
    ];

    useEffect(() => {
        if (gameState === 'betTime') {
            setBetValue(0);
            setBalanceValue(balance);
        }
    }, [gameState, balance]);

    const betPlaced = () => {
        //betEvent(betValue);
        if(betValue > 0 && betValue <= balance){
            socket.emit('placeBet', {betValue: betValue, user: user});
        }
    }

    const Reset = () => {
        setBalanceValue(balanceValue + betValue);
        setBetValue(0);
    }

    const Return = () => {
        socket.disconnect();
        navigate('/');
    }

    const Loan = (value) => {
        let newBalance = balanceValue + betValue + value;
        socket.emit('loan', {newBalance: newBalance, user: user});
    }

    const AddBet = (value) =>{
        setBetValue(betValue + value);
        setBalanceValue(balanceValue - value);
    }

    const hit = () => {
        socket.emit('hit', {user: user});
    }

    const stand = () => {
        socket.emit('stand', {user: user});
    }

    const double = () => {
        socket.emit('double', {user: user});
    }

    const surrender = () => {
        socket.emit('surrender', {user: user});
    }

    const resetGame = () => {
        socket.emit('restartGame', {user: user});
    }
    const getButtons = () => {
        //console.log(hitState, standState, doubleState, surrenderState, newGameState);
        console.log(gameState);
        if(gameState === 'betTime'){
            return (
                <div>
                    <div style={{textAlign: 'center'}}>
                        <div>
                            <UtilityButtons color="success" onClick={Return} className="icon-button" id="return-button">
                                <img src={require('./icons/arrow.png')} alt="Return" className="icon-image" />
                            </UtilityButtons>
                            <UtilityButtons color="success" onClick={Reset} className="icon-button" id="reset-button">
                                <img src={require('./icons/restart.png')} alt="Restart" className="icon-image" />
                            </UtilityButtons>
                        </div>
                        
                        {nominaly.map((nominal, index) => (
                            <Chips
                                key={index}
                                className="chip-button"
                                id={nominal.color}
                                disabled={balanceValue < nominal.wartosc}
                                onClick={() => AddBet(nominal.wartosc)}
                            >
                                <img src={nominal.image} alt={nominal.color} className="chip-image"/>
                                <span className="chip-value">{nominal.wartosc}$</span>
                            </Chips>
                        ))}
                    </div>
                    <div className="bet-container">
                            <div className="bet-label">
                                <p>{betValue} USD</p>
                            </div>
                            <Button variant="contained" onClick={betPlaced} color="success" disabled={betButtonState}>Bet</Button>
                    </div>
                    <Button variant="contained" onClick={() => Loan(1000)} color="warning" disabled={loanButtonState}>Loan</Button>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="buttons-container">
                        <Button variant="contained" onClick={() => hit()} color="success" disabled={hitState || !userTurn}>Hit</Button>
                        <div className="gap"></div>
                        <Button variant="contained" onClick={() => stand()} color="error" disabled={standState  || !userTurn}>Stand</Button>
                        <div className="gap"></div>
                        <Button variant="contained" onClick={() => double()} color="success" disabled={doubleState  || !userTurn}>Double</Button>
                        <div className="gap"></div>
                        <Button variant="contained" onClick={() => surrender()} color="error" disabled={surrenderState  || !userTurn}>Give up</Button>
                    </div>
                    <div style={{display : 'flex', alignItems : 'center', justifyContent : 'center', paddingTop : '10px'}}>
                    <Button variant="contained" onClick={() => resetGame()} color="warning" disabled={newGameState}>Reset Game</Button>
                    </div>
                </div>
            );
        }
    }

    return (
        <>
            {getButtons()}
        </>
    );
}

export default Buttons;