import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInLayout from '../layouts/SignInLayout';
import AdminLayout from '../layouts/AdminLayout';
import Login from "../containers/login";
import PolicyPage from "../containers/polices";
import PrePolicy from "../containers/polices/prefatory";
import CreatePolicy from "../containers/polices/create";
import EditPolicy from "../containers/polices/edit";
import ProtectedRoute from "../components/ProtectedRoute";
import { useSelector } from "react-redux";
import NotFound from "../components/NotFound";
import Dashboard from "../containers/polices/dashboard";
import Products from "../containers/polices/products";
const RoutesComponent = () => {
    const user = useSelector((state) => state.currentUser.data);
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={<SignInLayout />}
                >
                    <Route path="/" element={<Login />} />
                </Route>
                <Route
                    element={<AdminLayout />}
                >
                    <Route path="admin" element={<ProtectedRoute user={user} />}>
                        <Route index element={<PolicyPage />} />
                        <Route path="dashboard">
                            <Route path="statistics" element={<Dashboard />} />
                            <Route path="products" element={<Products />} />
                        </Route>
                        <Route path="pre-create" element={<PrePolicy />} />
                        <Route path="create" element={<CreatePolicy />} />
                        <Route path="edit/:id" element={<EditPolicy />} />
                    </Route>
                </Route>
                <Route
                    path={'*'}
                    element={<NotFound />}
                />
            </Routes>
        </BrowserRouter>
    );
};
export default RoutesComponent;
