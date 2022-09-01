import React, { useEffect, useState } from "react";
import DashboardFilters from "../../components/DashboardFilters";
import DashboardChart from "../../components/DashboardChart";
import { formatPrice } from "../../ functions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { getFirstOrders } from "../../redux/actions/orderActions";
import { getUsers } from "../../redux/actions/usersActions";
import OrdersPagination from "../../components/OrdersPagination";
import { resetStatus } from '../../redux/slices/orderSlice';
import { axiosAuth } from "../../axios-instances";
import { failureNotify, successNotify } from "../../notifications";
import { downloadFile } from "../../ functions";
import { useNavigate } from "react-router-dom";
import Accordion from "../../components/Accordion";
const Dashboard = () => {
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
            const response = await axiosAuth.get('/orders_export', {
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
    return (
        <div className="information dashboard-page">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12">
                        <DashboardFilters title={'Дашборд'} users={users} onFilterChange={onTopFiltersChange} onDateRange={onDateRange} onExport={getExcelData} excelLoading={excelLoading} />
                    </div>
                </div>
                <div className="dashboard-stats">
                    <div className="row dash-top-row">
                        <div className="col-6">
                            <div className="dashboard-card card">
                                <div className="dash-info">
                                    <div className="heading">
                                        Сумма оформления
                                    </div>
                                    <div className="price">
                                        {`${formatPrice(25000000)} ₽`}
                                    </div>
                                </div>
                                <DashboardChart />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="dashboard-card card">
                                <div className="dash-info">
                                    <div className="heading">
                                        Количество оформлений
                                    </div>
                                    <div className="price">
                                        {`${formatPrice(25000000)} ₽`}
                                    </div>
                                </div>
                                <DashboardChart />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <div className="mini-card card">
                                <div className="heading">
                                    Всего полисов
                                </div>
                                <div className="value">
                                    534 <div className="percent">+245%</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="mini-card card">
                                <div className="heading">
                                    Всего полисов
                                </div>
                                <div className="value">
                                    534 <div className="percent">+245%</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="mini-card card">
                                <div className="heading">
                                    Всего полисов
                                </div>
                                <div className="value">
                                    534 <div className="percent">+245%</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="mini-card card">
                                <div className="heading">
                                    Всего полисов
                                </div>
                                <div className="value">
                                    534 <div className="percent">+245%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="mini-card card">
                                <div className="heading">
                                    Средняя страховая сумма
                                </div>
                                <div className="value">
                                    {`${formatPrice(25000000)} ₽`}
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mini-card card">
                                <div className="heading">
                                    Средняя страховая премия
                                </div>
                                <div className="value">
                                    {`${formatPrice(2500000)} ₽`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="all-polices">
                    <h4>Полисы страхования</h4>
                    <Accordion loading={orders.loading} list={orders.data.data} />
                    {orders.data.total > 20 && (
                        <OrdersPagination last_page={orders.data.last_page} onFilterChange={onFilterChange} initialPage={filterProps.page} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

