import Card from './Card';
import './TextStyles.css';

const Hand = ({title, cards, actualScore}) => {
    const getTitle = () => {
        if(cards.length > 0){
            return (<h1>{title}</h1>);
        }
    }
    const getScore = () => {
        if(actualScore > 0){
            return (<h2>{actualScore}</h2>);
        }
    }
    
    return (
        <div className='hands'>
            {getTitle()}
            <div className='cards'>
                {cards.map((card, index) => {
                    return (<Card key={index} value={card.value} suit={card.suit} hidden={card.hidden}/>);
                })}
            </div>
            {getScore()}
        </div>
    );
}

export default Hand;