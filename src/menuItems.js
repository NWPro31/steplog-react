export const menuItems = [
    {
        id: 1,
        name: 'Домашняя страница',
        icon: 'fas fa-tachometer-alt nav-icon',
        path: '/dashboard',
        perm: 'user,admin'
    },
    {
        id: 2,
        name: 'Заказы',
        icon: 'fas fa-tty nav-icon',
        path: '/dashboard/orders/index',
        perm: 'admin'
    },
    {
        id: 3,
        name: 'Сайты',
        icon: 'fas fa-wrench nav-icon',
        path: '/dashboard/sites',
        perm: ''
    },
    {
        id: 4,
        name: 'Услуги',
        icon: 'far fa-caret-square-down nav-icon',
        perm: 'user',
        children: [
            {
                id: 5,
                name: 'Обслуживание сайта',
                icon: 'fas fa-hammer nav-icon',
                path: '/dashboard/customer/services/index',
                perm: 'user'

            },

            {
                id: 6,
                name: 'Домены',
                icon: 'fas fa-cogs nav-icon',
                path: '/dashboard/customer/domain/index',
                perm: 'user'
            },

            {
                id: 7,
                name: 'Хостинг',
                icon: 'fas fa-cogs nav-icon',
                path: '/dashboard/customer/hosting/index',
                perm: 'user'
            }
        ]
    },
    {
        id: 8,
        name: 'Клиенты',
        icon: 'fas fa-users nav-icon',
        path: '/dashboard/users',
        perm: 'admin'
    },
    {
        id: 9,
        name: 'Хостинг',
        icon: 'far fa-window-restore nav-icon',
        perm: 'admin',
        children: [
        {
            id: 10,
            name: 'Список тарифов',
            icon: 'fas fa-wrench nav-icon',
            path: '/dashboard/hosting/index',
            perm: 'admin'
        },
        {
            id: 11,
            name: 'Создать тариф',
            icon: 'fas fa-wrench nav-icon',
            path: '/dashboard/hosting/create',
            perm: 'admin'
        }
        ]
    },
    {
        id: 12,
        name: 'Домены',
        icon: 'fa fa-globe',
        perm: 'admin',
        children: [
            {
                id: 13,
                name: 'Тарифы',
                icon: 'fas fa-wrench nav-icon',
                path: '/dashboard/domain/index',
                perm: 'admin'
            },
            {
                id: 14,
                name: 'Регистраторы',
                icon: 'fas fa-wrench nav-icon',
                path: '/dashboard/domain/reg/index',
                perm: 'admin'
            }
        ]
    },
    {
        id: 15,
        name: 'Услуги',
        icon: 'fa fa-cogs',
        perm: 'admin',
        children: [
            {
                id: 16,
                name: 'Список услуг',
                icon: 'fas fa-wrench nav-icon',
                path: '/dashboard/services/index',
                perm: 'admin'
            }
        ]
    },
    {
        id: 17,
        name: 'Платежи',
        icon: 'fas fa-receipt nav-icon',
        path: '/dashboard/invoices/index',
        perm: 'user,admin'
    },
    {
        id: 18,
        name: 'Поддержка',
        icon: 'fas fa-receipt nav-icon',
        path: '/dashboard/tickets/index',
        perm: 'user,admin'
    },
    {
        id: 19,
        name: 'Профиль',
        icon: 'fas fa-receipt nav-icon',
        path: '/dashboard/customer/profile/index',
        perm: 'user,admin'
    }
];