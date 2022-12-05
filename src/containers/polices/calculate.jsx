import { Link } from 'react-router-dom';
import BackIcon from '../../components/Icons/BackIcon';
import CalculateForm from '../../components/CalculateForm';
import { useSelector } from 'react-redux';
import TopInfo from '../../components/TopInfo';
import { useNavigate } from 'react-router-dom';
const Calculate = () => {
    const tariff = useSelector(state => state.safe.data);
    const navigate = useNavigate();
    return (
        <div className="information">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-9">
                        <TopInfo title={"Страхование имущества в залоге"} onCancelPressed={() => {
                            navigate('/admin/cardsafe');
                        }} />
                        <CalculateForm />
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Calculate;