import { Button } from "@mui/material";
import { useState } from "react";

const Buttons = ({balance, gameState, betEvent, hitEvent, hitState, standEvent, standState, doubleEvent, doubleState, surrenderEvent, surrenderState, newGameEvent, newGameState}) => {
    const [betValue, setBetValue] = useState(0);
    const [balanceValue, setBalanceValue] = useState(balance);
    
    const nominaly = [
        { wartosc: 5000, ilosc: 0, color: 'Brązowy' },
        { wartosc: 2000, ilosc: 0, color: 'Jasno niebieski' },
        { wartosc: 1000, ilosc: 0, color: 'Żółty' },
        { wartosc: 500, ilosc: 0, color: 'Fioletowy' },
        { wartosc: 250, ilosc: 0, color: 'Różowy' },
        { wartosc: 100, ilosc: 0, color: 'Czarny' },
        { wartosc: 50, ilosc: 0, color: 'Pomarańczowy' },
        { wartosc: 25, ilosc: 0, color: 'Zielony' },
        { wartosc: 20, ilosc: 0, color: 'Szary' },
        { wartosc: 10, ilosc: 0, color: 'Niebieski' },
        { wartosc: 5, ilosc: 0, color: 'Czerwony' },
        { wartosc: 1, ilosc: 0, color: 'Biały' }
    ];
    const Reset = () => {
        setBalanceValue(balanceValue + betValue);
        setBetValue(0);
    }
    const AddBet = (value) =>{
        setBetValue(betValue + value);
        setBalanceValue(balanceValue - value);
    }
    const getButtons = () => {
        if(gameState === 'betTime'){
            return (
                //TUTAJ SYSTEM OBSTAWIANIA
                <div>
                    <p>
                        {nominaly.map((nominal, index) => <Button key={index} color="error" disabled={balanceValue < nominal.wartosc} onClick={() => AddBet(nominal.wartosc)}>{nominal.wartosc}$</Button>)}
                        <Button color="success" onClick={Reset}>Reset Bet</Button>
                    </p>
                    Czyli obstawiłeś: {betValue}
                    <Button onClick={() => betEvent(betValue)} color="success">Bet</Button>
                </div>
            );
        }else{
            return (
                <div>
                    <Button onClick={hitEvent} color="success" disabled={hitState}>Hit</Button>
                    <Button onClick={standEvent} color="error" disabled={standState}>Stand</Button>
                    <Button onClick={doubleEvent} color="success" disabled={doubleState}>Double</Button>
                    <Button onClick={surrenderEvent} color="error" disabled={surrenderState}>Surrender</Button>
                    <Button onClick={newGameEvent} color="warning" disabled={newGameState}>Reset Game</Button>
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