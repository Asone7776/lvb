import React, { useEffect } from "react";
import TopInfo from "../../components/TopInfo";
import EditForm from "../../components/EditForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetEditData } from "../../redux/slices/policeSlice";
const EditAccidentPolicy = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const editData = useSelector(state => state.police.editPolice);
    useEffect(() => {
        if (!editData) {
            navigate('/admin');
        }
        return () => {
            dispatch(resetEditData());
        }
    }, []);
    return (
        <div className="information">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-9">
                        <TopInfo title={`Редактировать полис ${editData && editData.policy_number}`} onNewPressed={() => {
                            navigate('/admin/accident');
                        }} onCancelPressed={() => {
                            navigate('/admin/accident');
                        }} />
                        <EditForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditAccidentPolicy;