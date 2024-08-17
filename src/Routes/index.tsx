import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Layouts
import VerticalLayout from '../Layouts/index';
import NonAuthLayout from '../Layouts/NonAuthLayout';

// Routes
import { authProtectedRoutes, publicRoutes } from './allRoutes';
import AuthProtected from './AuthProtected';

const Index = () => {

    return (
        <React.Fragment>
            <Routes>
                {publicRoutes.map((route: any, idx: any) => (
                    <Route
                        key={idx}
                        path={route.path}
                        element={
                            <NonAuthLayout>
                                {route.component}
                            </NonAuthLayout>
                        }
                    />
                ))}

                {authProtectedRoutes.map((route, idx) => (
                    <Route
                        key={idx}
                        path={route.path}
                        element={
                            <AuthProtected>
                                <VerticalLayout>{route.component}</VerticalLayout>
                            </AuthProtected>
                        }
                    />
                ))}

            </Routes>
        </React.Fragment>
    );
};

export default Index;
