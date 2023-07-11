export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  {
    path: '/user/register',
    layout: false,
    routes: [{ name: '登录', path: '/user/register', component: './User/Register' }],
  },
  {
    icon: 'smile',
    name:"用户中心",
    path: '/user/center',
    component: './User/Center'
  },
  {
    name: "AI表格",
    path:"/chart",
    routes: [
      { name: 'AI分析', icon: 'table', path: '/chart/generate', component: './Chart/Generate' },
      { name: '分析记录', icon: 'table', path: '/chart/account_chart', component: './Chart/AccountChart' }
    ]
  },
  {
    name: "AI提问",
    path:"/chat",
    routes: [
      { name: 'AI对话', icon: 'table', path: '/chat/generate', component: './Chat/Generate' },
      { name: '对话记录', icon: 'table', path: '/chat/account_generate', component: './Chat/AccountGenerate' }
    ]
  },
  {
    name: "开发者模块",
    path:"/open",
    routes: [
      { name: '接口查看', icon: 'table', path: '/open/all', component: './Open/Index' },
      { path: '/open/interface_info/:id', name: '查看接口', icon: 'smile', component: './Open/InterfaceInfo', hideInMenu: true },
    ]
  },
  {
    name: "管理员模块",
    path:"/admin",
    routes: [
      { name: '用户管理', icon: 'table', path: '/admin/user', component: './Admin/User' },
      { name: '接口管理', icon: 'table', path: '/admin/interface_info', component: './Admin/InterfaceInfo' },
    ],
    access:'canAdmin',
  },

  { path: '/', redirect: '/user/center' },
  { path: '*', layout: false, component: './404' },
];
