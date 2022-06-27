import React from 'react';
import BankLogo from '../img/logo.svg';
import { Link } from 'react-router-dom';
const LvbLogo = ({ linkTo }) => {
    return (
        linkTo ? (
            <div className='lvb-logo'>
                <Link to={linkTo}>
                    <img src={BankLogo} alt="bank-logo" />
                </Link>
            </div>
        ) : (
            <div className='lvb-logo'>
                <img src={BankLogo} alt="bank-logo" />
            </div>
        )
    );
}

export default LvbLogo;