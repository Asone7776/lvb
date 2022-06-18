import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import AdminFooter from '../components/AdminFooter';
const AdminLayout = () => {
    return (
        <div className={'admin-layout'}>
            <Header />
            <div className="content">
                <Outlet />
            </div>
            <AdminFooter />
        </div>
    )
};
export default AdminLayout;
