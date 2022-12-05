import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInLayout from '../layouts/SignInLayout';
import AdminLayout from '../layouts/AdminLayout';
import Login from "../containers/login";
import AccidentPolicyPage from "../containers/polices/AccidentPolicyPage";
import CardSafePolicyPage from "../containers/polices/CardSafePolicyPage";
import CalculateAccident from "../containers/polices/CalculateAccident";
import CalculateCardSafe from "../containers/polices/CalculateCardSafe";
import CreateAccident from "../containers/polices/CreateAccident";
import CreateCardSafe from "../containers/polices/CreateCardSafe";
import EditAccidentPolicy from "../containers/polices/EditAccidentPolicy";
import ProtectedRoute from "../components/ProtectedRoute";
import { useSelector } from "react-redux";
import NotFound from "../components/NotFound";
// import Dashboard from "../containers/polices/dashboard";
import Products from "../containers/polices/products";
import EditCardSafePolicy from "../containers/polices/EditCardSafePolicy";
import Calculate from "../containers/polices/calculate";
import CreateDV from "../containers/polices/CreateDV";
import CompletePolice from "../containers/complete";
import EditDV from "../components/EditDV";
import PackagesPolicyPage from "../containers/polices/PackagesPolictyPage";
import PackagesList from "../containers/polices/PackagesList";
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
                        {/* <Route index element={<Dashboard />} /> */}
                        <Route index element={<Products />} />
                        {/* <Route path="products" element={<Products />} /> */}
                        <Route path="accident" element={<AccidentPolicyPage />} />
                        <Route path="cardsafe" element={<CardSafePolicyPage />} />
                        <Route path="packages" element={<PackagesPolicyPage />} />
                        <Route path="packages-list" element={<PackagesList />} />
                        <Route path="calculate-accident" element={<CalculateAccident />} />
                        <Route path="calculate-cardsafe" element={<CalculateCardSafe />} />
                        <Route path="create-accident" element={<CreateAccident />} />
                        <Route path="create-cardsafe" element={<CreateCardSafe />} />
                        <Route path="edit-accident/:id" element={<EditAccidentPolicy />} />
                        <Route path="edit-cardsafe/:id" element={<EditCardSafePolicy />} />
                        <Route path="calculate" element={<Calculate />} />
                        <Route path="create-dv" element={<CreateDV />} />
                        <Route path="edit-dv/:id" element={<EditDV />} />
                        <Route path="complete" element={<CompletePolice />} />
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
