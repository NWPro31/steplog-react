import {
    CREATE_HOSTING_ROUTE,
    DASHBOARD_ROUTE,
    DOMAINS_ROUTE,
    HOME_ROUTE, INDEX_HOSTING_ROUTE,
    LOGIN_ROUTE,
    REGISTER_ROUTE, SHOW_HOSTING_ROUTE,
    SITES_ROUTE, UPDATE_HOSTING_ROUTE,
    USERS_ROUTE
} from "./utils/consts";
import Home from "./pages/Home";
import Sites from "./pages/Sites";
import Domains from "./pages/Domains";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/dashboard/Users";
import Create from "./pages/dashboard/hosting/Create";
import Index from "./pages/dashboard/hosting/Index";
import Update from "./pages/dashboard/hosting/Update";
import Show from "./pages/dashboard/hosting/Show";

export const authRoutes = [
    {
        path: 'sites',
        Component: Sites
    },
    {
        path: 'domains',
        Component: Domains
    },
    {
        path: USERS_ROUTE,
        Component: Users
    },
    {
        path: INDEX_HOSTING_ROUTE,
        Component: Index
    },
    {
        path: CREATE_HOSTING_ROUTE,
        Component: Create
    },
    {
        path: UPDATE_HOSTING_ROUTE  + '/:id',
        Component: Update
    },
    {
        path: SHOW_HOSTING_ROUTE  + '/:id',
        Component: Show
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