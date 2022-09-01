import React from "react";
import TopInfo from "../../components/TopInfo";
import CreateCardSafeForm from "../../components/CreateCardSafeForm";
import { useNavigate } from "react-router-dom";
const CreateCardSafe = () => {
    const navigate = useNavigate();
    return (
        <div className="information">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-9">
                        <TopInfo title={"Новый полис"} onCancelPressed={() => {
                            navigate('/admin/cardsafe');
                        }} />
                        <CreateCardSafeForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateCardSafe;