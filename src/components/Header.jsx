import LvbLogo from "./LvbLogo";
import { useNavigate } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate();
    return (
        <div className="admin-header">
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <LvbLogo linkTo={'/admin'} />
                    </div>
                    <div className="col-3">
                        <div className="current-user">
                            <span className="user-email">test@gmail.com</span>
                            <button className="btn btn-gray" onClick={()=>{
                                navigate('/');
                            }}>Выйти</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;

