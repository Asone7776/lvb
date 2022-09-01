import React from "react";
import TopInfo from "../../components/TopInfo";
import CreateAccidentForm from "../../components/CreateAccidentForm";
import { useNavigate } from "react-router-dom";
const CreateAccident = () => {
    const navigate = useNavigate();
    return (
        <div className="information">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-9">
                        <TopInfo title={"Новый полис"} onCancelPressed={() => {
                            navigate('/admin/accident');
                        }} />
                        <CreateAccidentForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateAccident;