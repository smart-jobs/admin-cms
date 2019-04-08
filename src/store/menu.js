const items = [
  {
    title: '网站设置',
    icon: 'system',
    module: 'cms',
    children: [
      {
        title: '信息配置',
        path: '/site/config',
        icon: 'set',
      },
      {
        title: '分站管理',
        path: '/site/list',
        icon: 'site',
        platform: 'master',
      },
    ],
  },
  {
    title: '就业服务',
    icon: 'news',
    module: 'cms',
    children: [
      {
        title: '就业指导',
        path: '/service/guide',
        icon: 'column',
      },
      {
        title: '就业政策',
        path: '/service/policy',
        icon: 'column',
      },
      {
        title: '常见问题',
        path: '/service/faq',
        icon: 'column',
      },
    ],
  },
  {
    title: '新闻公告',
    icon: 'news',
    module: 'cms',
    children: [
      {
        title: '焦点新闻',
        path: '/news/focus',
        icon: 'column',
      },
      {
        title: '就业快讯',
        path: '/news/flash',
        icon: 'column',
      },
      {
        title: '通知公告',
        path: '/news/notice',
        icon: 'column',
      },
    ],
  },
];

const MapMenu = (catalog = []) => item => ({
  title: item.title,
  options: {
    icon: item.icon,
    path: item.path,
    url: item.url,
    target: item.target,
    tooltip: item.tooltip,
    module: item.module,
    platform: item.platform,
    roles: item.roels,
    tags: item.tags,
    meta: { catalog: catalog.concat(item.title) },
  },
  children: (item.children || []).map(MapMenu(catalog.concat(item.title))),
});

// initial state
export const state = () => ({
  items: items.map(MapMenu()),
});
