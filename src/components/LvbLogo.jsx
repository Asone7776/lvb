import BankLogo from '../img/bank-logo.svg';

const LvbLogo = () => {
    return (
        <div className='lvb-logo'>
            <img src={BankLogo} alt="bank-logo" />
            <div className="logo-txt">
                <h5>Банк Левобережный</h5>
                <h6>Основа ваших решений</h6>
            </div>
        </div>
    );
}

export default LvbLogo;