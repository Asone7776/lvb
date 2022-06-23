import LvbLogo from "./LvbLogo";
import Cookies from "js-cookie";
import { resetUser } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
const Header = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.currentUser.data);
    const logout = () => {
        Cookies.remove('token');    
        dispatch(resetUser());
    }
    return (
        <div className="admin-header">
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <LvbLogo linkTo={'/admin'} />
                    </div>
                    <div className="col-3">
                        <div className="current-user">
                            <span className="user-email">{user && user.email}</span>
                            <button className="btn btn-gray" onClick={logout}>Выйти</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;

