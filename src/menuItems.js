export const menuItems = [
    {
        id: 1,
        name: 'Домашняя страница',
        icon: 'fas fa-tachometer-alt nav-icon',
        path: '/dashboard'
    },
    {
        id: 2,
        name: 'Сайты',
        icon: 'fas fa-wrench nav-icon',
        path: '/dashboard/sites'
    },
    {
        id: 3,
        name: 'Заказы',
        icon: 'far fa-caret-square-down nav-icon',
        children: [
            {
                id: 4,
                name: 'Обслуживание сайта',
                icon: 'fas fa-hammer nav-icon',
                path: '/dashboard/domains'
            },

            {
                id: 5,
                name: 'Домены',
                icon: 'fas fa-cogs nav-icon',
                path: '/sub-menu-2'
            },

            {
                id: 6,
                name: 'Хостинг',
                icon: 'fas fa-cogs nav-icon',
                path: '/sub-menu-3'
            }
        ]
    }
];