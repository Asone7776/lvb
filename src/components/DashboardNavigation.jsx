import { Link } from "react-router-dom";
import cn from "classnames";
import { dashboardPathNames } from '../constants';
const DashboardNavigation = ({ pathname }) => {
    return (
        <div className="dashboard-navigation">
            <Link className={cn({ 'active': pathname === dashboardPathNames[0] })} to={dashboardPathNames[0]}>
                Статистика и отчеты
            </Link>
            <Link className={cn({ 'active': pathname === dashboardPathNames[1] })} to={dashboardPathNames[1]}>
                Страховые продукты
            </Link>
        </div>
    );
}

export default DashboardNavigation;