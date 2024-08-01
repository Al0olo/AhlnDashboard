import React from 'react';
import { Route, Routes } from "react-router-dom";

//Layouts

//routes
import { getLoggedinUser } from 'helpers/api_helper';
import VerticalLayout from 'Layouts/index';
import NonAuthLayout from 'Layouts/NonAuthLayout';
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import AuthProtected from './AuthProtected';

const Index = () => {

    const userProfileSession = getLoggedinUser();
    console.log("userProfileSession", userProfileSession?.token);


    return (
        <React.Fragment>
            <Routes>
                {

                    !userProfileSession?.token ?

                        <Route>
                            {publicRoutes.map((route: { path: string | undefined; component: any; }, idx: React.Key | null | undefined) => (
                                <Route
                                    path={route.path}
                                    element={
                                        <NonAuthLayout>
                                            {route.component}
                                        </NonAuthLayout>
                                    }
                                    key={idx}
                                // exact={true}
                                />
                            ))}
                        </Route>
                        :
                        <Route>
                            {authProtectedRoutes.map((route, idx) => (
                                <Route
                                    path={route.path}
                                    element={
                                        <AuthProtected>
                                            <VerticalLayout>{route.component}</VerticalLayout>
                                        </AuthProtected>}
                                    key={idx}
                                // exact={true}
                                />
                            ))}
                        </Route>
                }

                <Route>
                    {authProtectedRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={
                                <AuthProtected>
                                    <VerticalLayout>{route.component}</VerticalLayout>
                                </AuthProtected>}
                            key={idx}
                        // exact={true}
                        />
                    ))}
                </Route>

            </Routes>
        </React.Fragment>
    );
};

export default Index;