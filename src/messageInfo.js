import React from 'react';

import './TextStyles.css';

const MessageInfo = ({message}) => {
    return (
        <div className="messageInfo">
            <div><p>{message}</p></div>
        </div>
    );
}

export default MessageInfo;
