//LINK DO PNG KART: https://code.google.com/archive/p/vector-playing-cards/downloads + https://www.pngegg.com/pl/png-svqrs/download

const Card = ({value, suit, hidden}) => {
    const getCard = () => {
        if(hidden === true){
            return (<div className="card_hidden">
                <img src={require('./Cards/reverse.png')} alt='hidden_card'/>
            </div>);
        }else{
            return (<div className="card">
                <img src={require('./Cards/' + value + '_' + suit + '.png')} alt={value + '_' + suit}/>
            </div>);
        }
    }
    
    return (
        <>
            {getCard()}
        </>
    );
}

export default Card;