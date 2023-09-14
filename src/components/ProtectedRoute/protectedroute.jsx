import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    return (
        <Route
            {...rest}
            render={(props) =>
                token ? (
                    <Component {...props} />
                ) : (
                    navigate("/")
                )
            }
        />
    );
};

export default PrivateRoute;
