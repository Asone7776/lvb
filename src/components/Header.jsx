import LvbLogo from "./LvbLogo";
const Header = () => {
    return (
        <div className="admin-header">
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <LvbLogo />
                    </div>
                    <div className="col-3">
                        <div className="current-user">
                            <span className="user-email">test@gmail.com</span>
                            <button className="btn btn-gray">Выйти</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;

