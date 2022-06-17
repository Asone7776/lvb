import React from 'react';
import { Outlet } from 'react-router-dom';

const SignInLayout = () => {
    return (
        <div className={'sign-in-layout'}>
            <Outlet />
        </div>
    )
};
export default SignInLayout;
