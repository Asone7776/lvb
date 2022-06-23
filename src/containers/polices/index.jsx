import NoDocument from "../../components/NoDocument";
import { useNavigate } from "react-router-dom";
import Accordion from "../../components/Accordion";
import TopInfo from "../../components/TopInfo";
import { useEffect } from "react";
import Spinner from '../../components/Spinner';
import { getOrders } from "../../redux/actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
const PolicyPage = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getOrders());
    }, []);
    if (orders.loading) {
        return (
            <div className="vertical-center">
                <Spinner />
            </div>
        )
    }
    if (!orders.loading && orders.data.length === 0) {
        return (
            <div className="vertical-center">
                <NoDocument />
            </div>
        )
    }
    return (
        <>
            <div className="information">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-8">
                            <TopInfo title={"Полисы страхования"} onNewPressed={() => {
                                navigate('/admin/pre-create');
                            }} />
                            <Accordion list={orders.data} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PolicyPage;