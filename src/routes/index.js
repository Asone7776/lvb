import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInLayout from '../layouts/SignInLayout';
import AdminLayout from '../layouts/AdminLayout';
import Login from "../containers/login";
import PolicyPage from "../containers/polices";
import CreatePolicy from "../containers/polices/create";

const RoutesComponent = () => {
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
                    <Route path="/admin">
                        <Route path="/admin" element={<PolicyPage />} />
                        <Route path="/admin/create" element={<CreatePolicy />} />
                    </Route>
                </Route>
                <Route
                    path={'*'}
                    element={<h1>Not found</h1>}
                />
            </Routes>
        </BrowserRouter>
    );
};
export default RoutesComponent;
