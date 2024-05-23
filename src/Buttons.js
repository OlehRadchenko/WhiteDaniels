import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import './Buttons.css'; 
import './TextStyles.css';

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

const Buttons = ({balance, setBalance, gameState, betEvent, hitEvent, hitState, standEvent, standState, doubleEvent, doubleState, surrenderEvent, surrenderState, newGameEvent, newGameState}) => {
    const [betValue, setBetValue] = useState(0);
    const [balanceValue, setBalanceValue] = useState(balance);
    
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

    const Reset = () => {
        setBalanceValue(balanceValue + betValue);
        setBetValue(0);
    }

    const Return = () => {
        window.location.href = '/';
    }    

    const Loan = (value) => {
        let newBalance = balanceValue + betValue + value;
        setBalanceValue(newBalance);
        setBalance(newBalance);
    }

    const AddBet = (value) =>{
        setBetValue(betValue + value);
        setBalanceValue(balanceValue - value);
    }
    const getButtons = () => {
        if(gameState === 'betTime'){
            return (
                <div>
                    <p>
                        <UtilityButtons color="success" onClick={Return} className="icon-button" id="return-button">
                            <img src={require('./icons/arrow.png')} alt="Return" className="icon-image" />
                        </UtilityButtons>
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
                        <UtilityButtons color="success" onClick={Reset} className="icon-button" id="reset-button">
                            <img src={require('./icons/restart.png')} alt="Restart" className="icon-image" />
                        </UtilityButtons>
                    </p>
                    <div className="bet-container">
                            <div className="bet-label">
                                <p>{betValue} USD</p>
                            </div>
                            <Button variant="contained" onClick={() => betEvent(betValue)} color="success">Bet</Button>
                    </div>
                    <Button variant="contained" onClick={() => Loan(1000)} color="warning">Loan</Button>
                </div>
            );
        } else {
            return (
                <div className="buttons-container">
                    <Button variant="contained" onClick={hitEvent} color="success" disabled={hitState}>Hit</Button>
                    <div className="gap"></div>
                    <Button variant="contained" onClick={standEvent} color="error" disabled={standState}>Stand</Button>
                    <div className="gap"></div>
                    <Button variant="contained" onClick={doubleEvent} color="success" disabled={doubleState}>Double</Button>
                    <div className="gap"></div>
                    <Button variant="contained" onClick={surrenderEvent} color="error" disabled={surrenderState}>Surrender</Button>
                    <div className="gap"></div>
                    <Button variant="contained" onClick={newGameEvent} color="warning" disabled={newGameState}>Reset Game</Button>
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