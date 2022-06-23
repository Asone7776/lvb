import LvbLogo from "./LvbLogo";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="vertical-center">
            <div className="not-found-page">
                <LvbLogo linkTo={'/'} />
                <h3>Такой страницы не существует</h3>
                <button className="btn btn-primary" onClick={() => {
                    navigate('/');
                }}>
                    На главную
                </button>
            </div>
        </div>
    );
}

export default NotFound;