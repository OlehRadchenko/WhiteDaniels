const Info = ({message, balance}) => {
    return (
        <div>
            <div>Your balance: {balance}$</div>
            <div>{message}</div>
        </div>
    );
}

export default Info;