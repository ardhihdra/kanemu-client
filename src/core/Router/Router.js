import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './Router.css';
import routes from './routes';

let listRoutes = [];
for(let rt in routes) {
    Object.assign(listRoutes, routes[rt]);
}

export default function AppRouter() {
    return (
        <Router>
            <div className="ds-flow">
                <Switch>
                    {   
                        listRoutes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    children={<route.main />}
                                />
                        ))
                    }
                </Switch>

                
                <div className="router-container fade-in">
                    <div className="router-list">
                        {routes.menus.map((route, index) => {
                            return (
                                <Link 
                                    className={route.class || 'router-box'}
                                    key={"routes.menus" + index}
                                    to={route.path}
                                    exact={route.exact ? route.exact.toString(): "false"} >
                                        <img src={route.icon} alt="icon" className="main-icon" />
                                </Link>
                            )
                        })}
                    </div>
                </div>

                
            </div>
        </Router>
    )
}