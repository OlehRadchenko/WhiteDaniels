const Info = ({message, balance}) => {
    return (
        <div>
            <div>{balance}</div>
            <div>{message}</div>
        </div>
    );
}

export default Info;