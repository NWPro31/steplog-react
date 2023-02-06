import {DASHBOARD_ROUTE, DOMAINS_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, SITES_ROUTE} from "./utils/consts";
import Home from "./pages/Home";
import Sites from "./pages/Sites";
import Domains from "./pages/Domains";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const authRoutes = [
    {
        path: DASHBOARD_ROUTE,
        Component: Home
    }
];

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: SITES_ROUTE,
        Component: Sites
    },
    {
        path: DOMAINS_ROUTE,
        Component: Domains
    },
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REGISTER_ROUTE,
        Component: Register
    }
];