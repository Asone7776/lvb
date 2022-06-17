import Family from '../../img/family.png'
import LvbLogo from '../../components/LvbLogo';
import SignInForm from '../../components/SignInForm';
import SignInFooter from '../../components/SignInFooter';
const Login = () => {
    return (
        <div className="login-page">
            <div className="left-block" style={{ backgroundImage: `url(${Family})` }}></div>
            <div className="right-block">
                <div className="logo text-center">
                    <LvbLogo />
                </div>
                <SignInForm />
                <SignInFooter />
            </div>
        </div>
    );
}

export default Login;