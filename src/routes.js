import {
    CREATE_DOMAIN_ROUTE,
    CREATE_HOSTING_ROUTE,
    DOMAINS_ROUTE,
    HOME_ROUTE, INDEX_DOMAIN_REG_ROUTE, INDEX_DOMAIN_ROUTE, INDEX_HOSTING_ROUTE,
    LOGIN_ROUTE,
    REGISTER_ROUTE, SHOW_DOMAIN_ROUTE, SHOW_HOSTING_ROUTE,
    SITES_ROUTE, UPDATE_DOMAIN_ROUTE, UPDATE_HOSTING_ROUTE,
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
import DomainIndex from "./pages/dashboard/domain/Index";
import DomainRegIndex from "./pages/dashboard/domain/reg/Index";
import DomainCreate from "./pages/dashboard/domain/Create";
import DomainUpdate from "./pages/dashboard/domain/Update";
import DomainShow from "./pages/dashboard/domain/Show";

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
    },
    {
        path: INDEX_DOMAIN_ROUTE,
        Component: DomainIndex
    },
    {
        path: INDEX_DOMAIN_REG_ROUTE,
        Component: DomainRegIndex
    },
    {
        path: CREATE_DOMAIN_ROUTE,
        Component: DomainCreate
    },
    {
        path: UPDATE_DOMAIN_ROUTE  + '/:id',
        Component: DomainUpdate
    },
    {
        path: SHOW_DOMAIN_ROUTE  + '/:id',
        Component: DomainShow
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