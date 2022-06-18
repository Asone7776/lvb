import VskLogo from '../img/vsk-logo.svg';
const AdminFooter = () => {
    return (
        <div className="admin-footer">
            <div className="container">
                <div className="row">
                    <div className="col-6 cm-col">
                        <p>1992–2021 Страховое акционерное общество «ВСК»<br />Россия, Москва, 121552, ул. Островная, 4</p>
                    </div>
                    <div className="col-6 cm-col right">
                        <img src={VskLogo} alt="vsk-logo" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminFooter;