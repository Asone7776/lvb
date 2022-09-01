import TopInfo from "../../components/TopInfo";
import PreCreateForm from "../../components/PreCreateForm";
import { useNavigate } from "react-router-dom";
const CalculateCardSafe = () => {
    const navigate = useNavigate();
    return (
        <div className="information">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-9">
                        <TopInfo title={"Расчёт стоимости полиса"} onCancelPressed={() => {navigate('/admin/cardsafe')}} />
                        <PreCreateForm linkToCreate={'/admin/create-cardsafe'} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CalculateCardSafe;