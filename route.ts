const routes = [
    {
        name: 'Module1',
        children: [
            {
                path: '/Module1/demo/list',
                name: 'demo-list',
                component: '@Module1/demo/list',
            },
            {
                path: '/Module1/demo/detail',
                component: '@Module1/demo/detail',
            }
        ],
    },
    {
        name: 'Module2',
        children: [
            {
                path: '/Module2/demo',
                name: 'demo',
                component: '@Module2/demo',
            },
        ],
    },
    {
        name: '测试1',
        children: [
            {
                path: '/test1/demo',
                name: 'demo',
                component: '@Test1/demo',
            },
        ],
    }
];

export default routes;
