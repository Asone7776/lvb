import VskLogo from '../img/vsk-logo.svg';
const SignInFooter = () => {
    return (
        <div className="sign-in-footer">
            <div className="col-6 cm-col">
                <p>1992–2021 Страховое акционерное общество «ВСК»<br />Россия, Москва, 121552, ул. Островная, 4</p>
            </div>
            <div className="col-6 cm-col">
                <img src={VskLogo} alt="vsk-logo" />
            </div>
        </div>
    );
}

export default SignInFooter;