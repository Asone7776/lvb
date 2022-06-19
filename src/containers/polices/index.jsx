import NoDocument from "../../components/NoDocument";
import { useNavigate } from "react-router-dom";
import Accordion from "../../components/Accordion";
import TopInfo from "../../components/TopInfo";
const PolicyPage = () => {
    const navigate = useNavigate();
    return (
        <>
            {/* <div className="vertical-center"> */}
            {/* <NoDocument /> */}
            {/* </div> */}
            <div className="information">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-8">
                            <TopInfo title={"Полисы страхования"} onNewPressed={() => {
                                navigate('/admin/pre-create');
                            }} />
                            <Accordion />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PolicyPage;