import React, { useState } from "react";
import NoDocument from "../../components/NoDocument";
import { useNavigate } from "react-router-dom";
import Accordion from "../../components/Accordion";
import TopInfo from "../../components/TopInfo";
import { useEffect } from "react";
import { getOrders } from "../../redux/actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import OrderFilters from '../../components/OrderFilters';
import { getUsers } from "../../redux/actions/usersActions";
import OrdersPagination from "../../components/OrdersPagination";
import { resetStatus } from '../../redux/slices/orderSlice';
const PolicyPage = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders);
    const users = useSelector((state) => state.users);
    const navigate = useNavigate();
    const [filterProps, setFilterProps] = useState({
        paginated: true,
        page: 1
    });
    useEffect(() => {
        dispatch(getOrders(filterProps));
    }, [filterProps, orders.changeStatus.success]);

    useEffect(() => {
        dispatch(getUsers());
    }, []);
    useEffect(() => {
        if (orders.changeStatus.success) {
            dispatch(resetStatus());
        }
    }, [orders.changeStatus]);
    const onFilterChange = (prop, value) => {
        setFilterProps({
            ...filterProps,
            [prop]: value
        })
    };

    const onDateRange = (arr) => {
        setFilterProps({
            ...filterProps,
            page: 1,
            from: arr[0] ? arr[0] : null,
            to: arr[1] ? arr[1] : null,
        })
    };

    const onTopFiltersChange = (prop, value) => {
        setFilterProps({
            ...filterProps,
            page: 1,
            [prop]: value
        })
    };

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
                            <OrderFilters users={users} onFilterChange={onTopFiltersChange} onDateRange={onDateRange} />
                            <Accordion loading={orders.loading} list={orders.data.data} />
                            {orders.data.total > 20 && (
                                <OrdersPagination last_page={orders.data.last_page} onFilterChange={onFilterChange} initialPage={filterProps.page} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PolicyPage;