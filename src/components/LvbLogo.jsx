import React from 'react';
import BankLogo from '../img/bank-logo.svg';
import { Link } from 'react-router-dom';
const LvbLogo = ({ linkTo }) => {
    return (
        linkTo ? (
            <div className='lvb-logo'>
                <Link to={linkTo}>
                    <img src={BankLogo} alt="bank-logo" />
                    <div className="logo-txt">
                        <h5>Банк Левобережный</h5>
                        <h6>Основа ваших решений</h6>
                    </div>
                </Link>
            </div>
        ) : (
            <div className='lvb-logo'>
                <img src={BankLogo} alt="bank-logo" />
                <div className="logo-txt">
                    <h5>Банк Левобережный</h5>
                    <h6>Основа ваших решений</h6>
                </div>
            </div>
        )
    );
}

export default LvbLogo;