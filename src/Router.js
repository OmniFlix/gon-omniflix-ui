import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import CircularProgress from './components/CircularProgress';

const Home = lazy(() => import('./containers/Home').then().catch());

const routes = [{
    path: '/',
    component: Home,
}];

const Router = () => {
    return (
        <div className="main_content">
            <Suspense fallback={<CircularProgress/>}>
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
                            element={<Home/>}
                            path="*"/>
                    </Routes>
                </div>
            </Suspense>
        </div>
    );
};

export default Router;
