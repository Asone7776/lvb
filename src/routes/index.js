import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInLayout from '../layouts/SignInLayout';
import AdminLayout from '../layouts/AdminLayout';
import Login from "../containers/login";
import PolicyPage from "../containers/polices";
import PrePolicy from "../containers/polices/prefatory";
import CreatePolicy from "../containers/polices/create";
import ProtectedRoute from "../components/ProtectedRoute";
import { useSelector } from "react-redux";
import NotFound from "../components/NotFound";
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
                    <Route path="/admin" element={<ProtectedRoute user={user} />}>
                        <Route path="/admin" element={<PolicyPage />} />
                        <Route path="/admin/pre-create" element={<PrePolicy />} />
                        <Route path="/admin/create" element={<CreatePolicy />} />
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
