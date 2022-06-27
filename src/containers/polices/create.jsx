import React from "react";
import TopInfo from "../../components/TopInfo";
import CreateForm from "../../components/CreateForm";
import { useNavigate } from "react-router-dom";
const CreatePolicy = () => {
    const navigate = useNavigate();
    return (
        <div className="information">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-8">
                        <TopInfo title={"Новый полис"} onNewPressed={() => {
                            navigate('/admin/pre-create');
                        }} onCancelPressed={() => {
                            navigate('/admin/pre-create');
                        }} />
                        <CreateForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePolicy;