import TopInfo from "../../components/TopInfo";
import PreCreateForm from "../../components/PreCreateForm";
import { useNavigate } from "react-router-dom";
const PrePolicy = () => {
    const navigate = useNavigate();
    return (
        <div className="information">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-8">
                        <TopInfo title={"Расчёт стоимости полиса"} onNewPressed={() => { }} onCancelPressed={() => {navigate('/admin')}} />
                        <PreCreateForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrePolicy;