import React from 'react';

import './TextStyles.css';

const BalanceInfo = ({balance}) => {
    return (
        <div className="balance-container">
            <div className='balance-label'><p>Your balance: {balance}$</p></div>
        </div>
    );
}

export default BalanceInfo;
