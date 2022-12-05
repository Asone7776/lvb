import React, { useState, useEffect } from "react";
import moment from "moment";
import NoDocument from "../../components/NoDocument";
import { useNavigate } from "react-router-dom";
import Accordion from "../../components/Accordion";
import TopInfo from "../../components/TopInfo";
import { getFirstOrders } from "../../redux/actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import OrderFilters from '../../components/OrderFilters';
import { getUsers } from "../../redux/actions/usersActions";
import OrdersPagination from "../../components/OrdersPagination";
import { resetStatus } from '../../redux/slices/orderSlice';
import { axiosAuth } from "../../axios-instances";
import { failureNotify, successNotify } from "../../notifications";
import { downloadFile } from "../../functions";
const AccidentPolicyPage = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders);
    const users = useSelector((state) => state.users);
    const [excelLoading, setExcelLoading] = useState(false);
    const navigate = useNavigate();
    const [filterProps, setFilterProps] = useState({
        paginated: true,
        page: 1
    });
    useEffect(() => {
        dispatch(getFirstOrders(filterProps));
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
            from: arr[0] ? moment(arr[0]).format('DD.MM.YYYY') : null,
            to: arr[1] ? moment(arr[1]).format('DD.MM.YYYY') : null,
        })
    };

    const onTopFiltersChange = (prop, value) => {
        setFilterProps({
            ...filterProps,
            page: 1,
            [prop]: value
        })
    };

    const getExcelData = async () => {
        setExcelLoading(true);
        const { search, users, from, to, status } = filterProps;
        const params = {
            search,
            users,
            from,
            to,
            status
        }
        try {
            const response = await axiosAuth.get('/first/orders_export', {
                params,
                responseType: "blob",
            });
            const data = response.data;
            const urlCreator = window.URL || window.webkitURL;
            const fileUrl = urlCreator.createObjectURL(data);
            const filename = 'Отчёт'.replace("attachment; filename=", "");
            downloadFile(fileUrl, filename);
            successNotify('Отчёт выгружен');
        } catch (error) {
            if (error.response.data && error.response.data.errors) {
                failureNotify(error.response.data.errors);
            }
        }
        finally {
            setExcelLoading(false);
        }
    }

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
                        <div className="col-9">
                            <TopInfo title={"Страховние от несчастных случаев"} titleNew={'Создать новый'} onBackPressed={() => {
                                navigate('/admin');
                            }} onNewPressed={() => {
                                navigate('/admin/calculate-accident');
                            }} />
                            <OrderFilters users={users} onFilterChange={onTopFiltersChange} onDateRange={onDateRange} onExport={getExcelData} excelLoading={excelLoading} />
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

export default AccidentPolicyPage;