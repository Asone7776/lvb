import React from "react";
import DashboardFilters from "../../components/DashboardFilters";
import DashboardChart from "../../components/DashboardChart";
const Dashboard = () => {
    return (
        <div className="information">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12">
                        <DashboardFilters title={'Дашборд'} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body">
                                <DashboardChart />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body">
                                <DashboardChart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

