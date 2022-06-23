import React, { useState } from "react";
import NoDocument from "../../components/NoDocument";
import { useNavigate } from "react-router-dom";
import Accordion from "../../components/Accordion";
import TopInfo from "../../components/TopInfo";
import { useEffect } from "react";
import Spinner from '../../components/Spinner';
import { getOrders } from "../../redux/actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import OrderFilters from '../../components/OrderFilters';
const PolicyPage = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders);
    const navigate = useNavigate();
    const [filterProps, setFilterProps] = useState({});
    useEffect(() => {
        dispatch(getOrders(filterProps));
    }, [filterProps]);

    useEffect(() => {
        console.log(filterProps);
    }, [filterProps]);
    const onFilterChange = (prop, value) => {
        setFilterProps({
            ...filterProps,
            [prop]: value
        })
    };

    const onDateRange = (arr) => {

        setFilterProps({
            ...filterProps,
            from: arr[0] ? arr[0] : null,
            to: arr[1] ? arr[1] : null,
        })
    };
    // if (orders.loading) {
    //     return (
    //         <div className="vertical-center">
    //             <Spinner />
    //         </div>
    //     )
    // }
    if (!orders.loading && orders.data.length === 0 && Object.keys(filterProps).length === 0) {
        return (
            <div className="vertical-center">
                <NoDocument />
            </div>
        )
    }
    return (
        <>
            <div className="information list-wrapper">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-8">
                            <TopInfo title={"Полисы страхования"} titleNew={'Создать новый'} onNewPressed={() => {
                                navigate('/admin/pre-create');
                            }} />
                            <OrderFilters onFilterChange={onFilterChange} onDateRange={onDateRange} />
                            <Accordion list={orders.data} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PolicyPage;