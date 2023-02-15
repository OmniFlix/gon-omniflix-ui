import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import CircularProgress from './components/CircularProgress';

const WalletConnect = lazy(() => import('./containers/WalletConnect').then().catch());
const Dashboard = lazy(() => import('./containers/Dashboard').then().catch());
const NavBar = lazy(() => import('./containers/NavBar').then().catch());
const About = lazy(() => import('./containers/About').then().catch());

const routes = [{
    path: '/',
    component: WalletConnect,
}, {
    path: '/about',
    component: About,
}, {
    path: '/dashboard',
    component: Dashboard,
}];

const Router = () => {
    return (
        <div className="main_content">
            <Suspense fallback={<CircularProgress/>}>
                <NavBar/>
                <div className="content_div scroll_bar">
                    <Routes>
                        {routes.map((route) =>
                            <Route
                                key={route.path}
                                exact
                                element={<route.component/>}
                                path={route.path}/>,
                        )}
                        <Route
                            exact
                            element={<WalletConnect/>}
                            path="*"/>
                    </Routes>
                </div>
            </Suspense>
        </div>
    );
};

export default Router;
