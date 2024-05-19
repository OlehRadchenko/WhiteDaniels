import { Button } from "@mui/material";
import { useReducer, useEffect } from "react";
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

const initialState = {
    betValue: 0,
    balanceValue: 0,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_BALANCE':
            return { ...state, balanceValue: action.balance - state.betValue };
        case 'ADD_BET':
            return {
                ...state,
                betValue: state.betValue + action.value,
                balanceValue: state.balanceValue - action.value,
            };
        case 'REMOVE_BET':
            return {
                ...state,
                betValue: state.betValue - action.value,
                balanceValue: state.balanceValue + action.value,
            };
        case 'RESET':
            return { ...state, betValue: 0, balanceValue: action.balance };
        default:
            throw new Error();
    }
}

const Buttons = ({ balance, gameState, betEvent, hitEvent, hitState, standEvent, standState, doubleEvent, doubleState, surrenderEvent, surrenderState, newGameEvent, newGameState, startChipsRestoreEvent, getBalance }) => {
    const [state, dispatch] = useReducer(reducer, { ...initialState, balanceValue: balance });

    useEffect(() => {
        dispatch({ type: 'SET_BALANCE', balance });
    }, [balance]);

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

    const Reset = () => {
        dispatch({ type: 'RESET', balance: getBalance() });
    };

    const Return = () => {
        window.location.href = '/blackjack';
    };

    const RestoreBalance = () => {
        if (state.balanceValue <= 0) {
            startChipsRestoreEvent();
            Reset();
        }
        else 
            dispatch({type: 'REMOVE_BET', value: state.betValue});
    };

    // BUG: Jak ma sie wymaxowany bet i hajs ( zalozmy ze bet to 20k i balance to 20k ), logika wykrywa, ze niby nie masz pieniedzy, i przydziela ci 10k jako default

    const AddBet = (value) => {
        dispatch({ type: 'ADD_BET', value });
    };

    const getButtons = () => {
        if (gameState === 'betTime') {
            return (
                //TUTAJ SYSTEM OBSTAWIANIA
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
                                disabled={state.balanceValue < nominal.wartosc}
                                onClick={() => AddBet(nominal.wartosc)}
                            >
                                <img src={nominal.image} alt={nominal.color} className="chip-image"/>
                                <span className="chip-value">{nominal.wartosc}$</span>
                            </Chips>
                        ))}
                        <UtilityButtons
                            color="success"
                            onClick={state.balanceValue <= 0 ? RestoreBalance : RestoreBalance}
                            className={`icon-button ${state.balanceValue <= 0 ? 'red-icon' : ''}`}
                            id="reset-button"
                        >
                            <img src={require('./icons/restart.png')} alt="Restart" className="icon-image" />
                        </UtilityButtons>
                    </p>
                    <div className="bet-container">
                        <div className="bet-label">
                            <p>{state.betValue} USD</p>
                        </div>
                        <Button variant="contained" onClick={() => betEvent(state.betValue)} color="success">Bet</Button>
                    </div>
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
    };

    return (
        <>
            {getButtons()}
        </>
    );
};

export default Buttons;
