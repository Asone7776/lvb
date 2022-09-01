import React, { useEffect } from "react";
import TopInfo from "../../components/TopInfo";
import EditCardSafeForm from "../../components/EditCardSafeForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetEditData } from "../../redux/slices/policeSlice";
const EditCardSafePolicy = () => {
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
                            navigate('/admin/cardsafe');
                        }} onCancelPressed={() => {
                            navigate('/admin/cardsafe');
                        }} />
                        <EditCardSafeForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditCardSafePolicy;