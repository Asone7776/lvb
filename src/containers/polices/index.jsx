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
const PolicyPage = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders);
    const users = useSelector((state) => state.users);
    const navigate = useNavigate();
    const [filterProps, setFilterProps] = useState({
        paginated: true
    });
    useEffect(() => {
        dispatch(getOrders(filterProps));
    }, [filterProps]);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

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
                            <OrderFilters users={users} onFilterChange={onFilterChange} onDateRange={onDateRange} />
                            <Accordion loading={orders.loading} list={orders.data.data} />
                            <OrdersPagination last_page={orders.data.last_page} items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PolicyPage;