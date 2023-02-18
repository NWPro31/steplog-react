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
        name: 'Сайты',
        icon: 'fas fa-wrench nav-icon',
        path: '/dashboard/sites',
        perm: 'user'
    },
    {
        id: 3,
        name: 'Услуги',
        icon: 'far fa-caret-square-down nav-icon',
        perm: 'user',
        children: [
            {
                id: 4,
                name: 'Обслуживание сайта',
                icon: 'fas fa-hammer nav-icon',
                path: '/dashboard/domains',
                perm: 'user'

            },

            {
                id: 5,
                name: 'Домены',
                icon: 'fas fa-cogs nav-icon',
                path: '/sub-menu-2',
                perm: 'user'
            },

            {
                id: 6,
                name: 'Хостинг',
                icon: 'fas fa-cogs nav-icon',
                path: '/sub-menu-3',
                perm: 'user'
            }
        ]
    },
    {
        id: 7,
        name: 'Клиенты',
        icon: 'fas fa-wrench nav-icon',
        path: '/dashboard/users',
        perm: 'admin'
    },
    {
        id: 8,
        name: 'Хостинг',
        icon: 'far fa-caret-square-down nav-icon',
        perm: 'admin',
        children: [
        {
            id: 9,
            name: 'Список тарифов',
            icon: 'fas fa-wrench nav-icon',
            path: '/dashboard/hosting/index',
            perm: 'admin'
        },
        {
            id: 10,
            name: 'Создать тариф',
            icon: 'fas fa-wrench nav-icon',
            path: '/dashboard/hosting/create',
            perm: 'admin'
        }
        ]
    },
    {
        id: 11,
        name: 'Домены',
        icon: 'far fa-caret-square-down nav-icon',
        perm: 'admin',
        children: [
            {
                id: 12,
                name: 'Тарифы',
                icon: 'fas fa-wrench nav-icon',
                path: '/dashboard/domain/index',
                perm: 'admin'
            },
            {
                id: 13,
                name: 'Регистраторы',
                icon: 'fas fa-wrench nav-icon',
                path: '/dashboard/domain/reg/index',
                perm: 'admin'
            }
        ]
    },
    {
        id: 14,
        name: 'Услуги',
        icon: 'far fa-caret-square-down nav-icon',
        perm: 'admin',
        children: [
            {
                id: 15,
                name: 'Список услуг',
                icon: 'fas fa-wrench nav-icon',
                path: '/dashboard/services/index',
                perm: 'admin'
            }
        ]
    }
];