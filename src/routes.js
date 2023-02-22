import {
    CREATE_CUSTOMER_SERVICES_ROUTE,
    CREATE_DOMAIN_REG_ROUTE,
    CREATE_DOMAIN_ROUTE,
    CREATE_HOSTING_ROUTE,
    CREATE_SERVICES_ROUTE,
    DOMAINS_ROUTE,
    HOME_ROUTE,
    INDEX_CUSTOMER_SERVICES_ROUTE,
    INDEX_DOMAIN_REG_ROUTE,
    INDEX_DOMAIN_ROUTE,
    INDEX_HOSTING_ROUTE,
    INDEX_SERVICES_ROUTE,
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    SHOW_DOMAIN_REG_ROUTE,
    SHOW_DOMAIN_ROUTE,
    SHOW_HOSTING_ROUTE,
    SITES_ROUTE,
    UPDATE_DOMAIN_REG_ROUTE,
    UPDATE_DOMAIN_ROUTE,
    UPDATE_HOSTING_ROUTE,
    UPDATE_SERVICES_ROUTE,
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
import DomainRegCreate from "./pages/dashboard/domain/reg/Create";
import DomainRegUpdate from "./pages/dashboard/domain/reg/Update";
import DomainRegShow from "./pages/dashboard/domain/reg/Show";
import ServicesIndex from "./pages/dashboard/services/Index";
import ServicesCreate from "./pages/dashboard/services/Create";
import ServicesUpdate from "./pages/dashboard/services/Update";
import CustomerServicesIndex from "./pages/dashboard/customer/services/Index";
import CustomerServicesCreate from "./pages/dashboard/customer/services/Create";

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
    },
    {
        path: CREATE_DOMAIN_REG_ROUTE,
        Component: DomainRegCreate
    },
    {
        path: UPDATE_DOMAIN_REG_ROUTE  + '/:id',
        Component: DomainRegUpdate
    },
    {
        path: SHOW_DOMAIN_REG_ROUTE  + '/:id',
        Component: DomainRegShow
    },
    {
        path: INDEX_SERVICES_ROUTE,
        Component: ServicesIndex
    },
    {
        path: CREATE_SERVICES_ROUTE,
        Component: ServicesCreate
    },
    {
        path: UPDATE_SERVICES_ROUTE  + '/:id',
        Component: ServicesUpdate
    },
    {
        path: INDEX_CUSTOMER_SERVICES_ROUTE,
        Component: CustomerServicesIndex
    },
    {
        path: CREATE_CUSTOMER_SERVICES_ROUTE,
        Component: CustomerServicesCreate
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