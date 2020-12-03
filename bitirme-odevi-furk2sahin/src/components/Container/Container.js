import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { routes } from '../../config/Router'
import PrivateRoute from '../../utils/PrivateRoute'
import SessionContext from '../../contexts/SessionContext'
import { Wrapper } from './Container.styles'

const Container = () => {
    const [authenticated, setAuthenticated] = useState('');
    const [user, setUser] = useState({});

    if (routes.some((route) => route.path === window.location.pathname) && authenticated !== '') {
        if (authenticated === "User" && window.location.pathname !== "/user")
            window.location.pathname = "/user";
        else if (authenticated === "Employee" && window.location.pathname !== "/employee")
            window.location.pathname = "/employee";
        else if (authenticated === "ParkingOwner" && window.location.pathname !== "/parkingowner")
            window.location.pathname = "/parkingowner"
    } else if (window.location.pathname !== "/register" && window.location.pathname !== "/login")
        window.location.pathname = "/login"

    return (
        <Wrapper>
            <Router>
                <Switch>
                    <SessionContext.Provider value={{ user, setUser, authenticated, setAuthenticated }}>
                        {
                            routes.map((route, index) =>
                                route.isPrivate ? (
                                    <PrivateRoute
                                        exact={route.exact}
                                        path={route.path}
                                        isAuthenticated={route.authenticated}
                                        authenticated={authenticated}
                                        key={index}
                                    >
                                        {route.component()}
                                    </PrivateRoute>
                                ) : (
                                        < Route exact={route.exact} path={route.path} key={index}>
                                            {route.component()}
                                        </Route>
                                    )
                            )
                        }
                    </SessionContext.Provider>
                </Switch>
            </Router>
        </Wrapper >
    )
}

export default Container
