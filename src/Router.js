import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import CircularProgress from './components/CircularProgress';

const Dashboard = lazy(() => import('./containers/Dashboard').then().catch());
const Marketplace = lazy(() => import('./containers/Dashboard/MarketPlace').then().catch());
const NavBar = lazy(() => import('./containers/NavBar').then().catch());
const About = lazy(() => import('./containers/About').then().catch());
const SingleCollection = lazy(() => import('./containers/SingleCollection').then().catch());
const CreateCollection = lazy(() => import('./containers/CreateCollection').then().catch());
const MintNFT = lazy(() => import('./containers/MintNFT').then().catch());

const routes = [{
    path: '/about',
    component: About,
}, {
    path: '/:chain/dashboard',
    component: Dashboard,
}, {
    path: '/:chain/dashboard/all_collections',
    component: Dashboard,
}, {
    path: '/:chain/dashboard/my_collections',
    component: Dashboard,
}, {
    path: '/:chain/dashboard/my_nfts',
    component: Dashboard,
}, {
    path: '/:chain/dashboard/marketplace',
    component: Marketplace,
}, {
    path: '/:chain/collection/:id',
    component: SingleCollection,
}, {
    path: '/create-collection',
    component: CreateCollection,
}, {
    path: '/create-collection/:collectionID',
    component: CreateCollection,
}, {
    path: '/mint',
    component: MintNFT,
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
                            element={<Dashboard/>}
                            path="*"/>
                    </Routes>
                </div>
            </Suspense>
        </div>
    );
};

export default Router;
