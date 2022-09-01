import TopInfo from "../../components/TopInfo";
import PreCreateForm from "../../components/PreCreateForm";
import { useNavigate } from "react-router-dom";
const CalculateAccident = () => {
    const navigate = useNavigate();
    return (
        <div className="information">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-9">
                        <TopInfo title={"Расчёт стоимости полиса"} onCancelPressed={() => {navigate('/admin/accident')}} />
                        <PreCreateForm linkToCreate={'/admin/create-accident'} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CalculateAccident;