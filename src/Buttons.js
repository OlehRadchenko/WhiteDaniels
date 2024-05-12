import { Button } from "@mui/material";

const Buttons = ({balance, gameState, betEvent, hitEvent, hitState, standEvent, standState, doubleEvent, doubleState, surrenderEvent, surrenderState, newGameEvent, newGameState}) => {
    const getButtons = () => {
        if(gameState === 'betTime'){
            return (
                //TUTAJ SYSTEM OBSTAWIANIA
                <div>
                    <Button onClick={() => betEvent(100)} color="success">Bet</Button>
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