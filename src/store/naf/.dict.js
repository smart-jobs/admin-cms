// mutation types
export const LOADED = 'LOADED';

export const PRESET = {
  status: [{ code: '0', name: '正常' }, { code: '1', name: '挂起' }, { code: '2', name: '注销' }],
  usage: [{ code: '0', name: '正常' }, { code: '1', name: '停用' }],
  column: [
    { code: 'focus', name: '焦点新闻' },
    { code: 'flash', name: '新闻快讯' },
    { code: 'notice', name: '通知公告' },
    { code: 'guide', name: '就业指导' },
    { code: 'faq', name: '常见问题' },
    { code: 'policy', name: '政策文件' },
  ],
};
