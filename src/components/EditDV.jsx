import EditDVForm from "./EditDVForm";
import { useSelector } from "react-redux";
import TopInfo from "./TopInfo";
import { useNavigate } from "react-router-dom";
const EditDV = () => {
    const police = useSelector(state => state.police.holdedPolice);
    const navigate = useNavigate();
    return (
        <div className="information">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-9">
                        <TopInfo title={`Редактировать полис - ${police && police.policy_number}`} onCancelPressed={() => {
                            navigate('/admin');
                        }} />
                        <EditDVForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditDV;