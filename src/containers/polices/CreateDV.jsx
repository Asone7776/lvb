// import CreateForm from "../../components/CreateForm";
import TopInfo from '../../components/TopInfo';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CreateDVForm from '../../components/CreateDVForm';

const CreateDV = () => {
    const navigate = useNavigate();
    const safe = useSelector(state => state.safe.data);

    return (
        <div className="information">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-9">
                        <TopInfo title={safe.tariffName} onCancelPressed={() => {
                            navigate('/admin');
                        }} />
                        <CreateDVForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateDV;
