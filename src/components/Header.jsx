import LvbLogo from "./LvbLogo";
import Cookies from "js-cookie";
import { resetUser } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { dashboardPathNames } from '../constants';
import DashboardNavigation from "./DashboardNavigation";
import cn from "classnames";
const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.currentUser.data);
    const dashboardHeader = location && dashboardPathNames.includes(location.pathname);
    const logout = () => {
        Cookies.remove('token');
        dispatch(resetUser());
    }
    return (
        <div className={cn('admin-header', { 'dashboard-header': dashboardHeader })}>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <LvbLogo linkTo={'/admin'} />
                    </div>
                    {dashboardHeader && (
                        <div className="col-4">
                            <DashboardNavigation pathname={location.pathname} />
                        </div>
                    )}
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

