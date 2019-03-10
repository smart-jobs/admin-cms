module.exports = {
  presets: ['@vue/app'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
    // ['import', { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: 'css' }],
  ],
};
