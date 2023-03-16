import {
    CREATE_COMMENT_ORDER_SERVICE_ROUTE,
    CREATE_CUSTOMER_SERVICES_ROUTE,
    CREATE_DOMAIN_REG_ROUTE,
    CREATE_DOMAIN_ROUTE,
    CREATE_HOSTING_ROUTE, CREATE_INVOICE_ORDER_SERVICE_ROUTE,
    CREATE_SERVICES_ROUTE,
    DOMAINS_ROUTE,
    HOME_ROUTE, INDEX_CUSTOMER_DOMAIN_ROUTE,
    INDEX_CUSTOMER_SERVICES_ROUTE,
    INDEX_DOMAIN_REG_ROUTE,
    INDEX_DOMAIN_ROUTE,
    INDEX_HOSTING_ROUTE, INDEX_INVOICES_ROUTE, INDEX_ORDERS_ROUTE,
    INDEX_SERVICES_ROUTE,
    LOGIN_ROUTE,
    REGISTER_ROUTE, SELECT_INVOICES_ROUTE, SHOW_COMMENT_ORDER_SERVICE_ROUTE, SHOW_CUSTOMER_SERVICES_ROUTE,
    SHOW_DOMAIN_REG_ROUTE,
    SHOW_DOMAIN_ROUTE,
    SHOW_HOSTING_ROUTE, SHOW_ORDER_DOMAIN_ROUTE, SHOW_ORDERS_ROUTE,
    SITES_ROUTE,
    UPDATE_DOMAIN_REG_ROUTE,
    UPDATE_DOMAIN_ROUTE,
    UPDATE_HOSTING_ROUTE, UPDATE_INVOICES_ROUTE, UPDATE_ORDER_DOMAIN_ROUTE, UPDATE_ORDERS_ROUTE,
    UPDATE_SERVICES_ROUTE,
    USERS_ROUTE, WHOIS_CUSTOMER_DOMAIN_ROUTE
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
import OrdersIndex from "./pages/dashboard/orders/Index";
import OrdersShow from "./pages/dashboard/orders/Show";
import OrdersUpdate from "./pages/dashboard/orders/Update";
import CommentOrderServicesCreate from "./pages/dashboard/orders/service/comment/Create";
import CommentOrderServicesShow from "./pages/dashboard/orders/service/comment/Show";
import InvoiceOrderServicesCreate from "./pages/dashboard/orders/service/invoice/Create";
import InvoicesIndex from "./pages/dashboard/invoices/Index";
import InvoiceUpdate from "./pages/dashboard/invoices/Update";
import InvoicesSelect from "./pages/dashboard/invoices/Select";
import CustomerServicesShow from "./pages/dashboard/customer/services/Show";
import CustomerDomainIndex from "./pages/dashboard/customer/domain/Index";
import CustomerDomainWhois from "./pages/dashboard/customer/domain/Whois";
import OrdersDomainShow from "./pages/dashboard/orders/domain/Show";
import OrdersDomainUpdate from "./pages/dashboard/orders/domain/Update";

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
    },
    {
        path: SHOW_CUSTOMER_SERVICES_ROUTE  + '/:id',
        Component: CustomerServicesShow
    },
    {
        path: INDEX_ORDERS_ROUTE,
        Component: OrdersIndex
    },
    {
        path: SHOW_ORDERS_ROUTE  + '/:id',
        Component: OrdersShow
    },
    {
        path: UPDATE_ORDERS_ROUTE  + '/:id',
        Component: OrdersUpdate
    },
    {
        path: CREATE_COMMENT_ORDER_SERVICE_ROUTE  + '/:id',
        Component: CommentOrderServicesCreate
    },
    {
        path: SHOW_COMMENT_ORDER_SERVICE_ROUTE  + '/:id',
        Component: CommentOrderServicesShow
    },
    {
        path: CREATE_INVOICE_ORDER_SERVICE_ROUTE  + '/:id',
        Component: InvoiceOrderServicesCreate
    },
    {
        path: INDEX_INVOICES_ROUTE,
        Component: InvoicesIndex
    },
    {
        path: UPDATE_INVOICES_ROUTE  + '/:id',
        Component: InvoiceUpdate
    },
    {
        path: SELECT_INVOICES_ROUTE  + '/:id',
        Component: InvoicesSelect
    },
    {
        path: INDEX_CUSTOMER_DOMAIN_ROUTE,
        Component: CustomerDomainIndex
    },
    {
        path: WHOIS_CUSTOMER_DOMAIN_ROUTE,
        Component: CustomerDomainWhois
    },
    {
        path: SHOW_ORDER_DOMAIN_ROUTE  + '/:id',
        Component: OrdersDomainShow
    },
    {
        path: UPDATE_ORDER_DOMAIN_ROUTE  + '/:id',
        Component: OrdersDomainUpdate
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