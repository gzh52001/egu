const path = require('path')
const { override, fixBabelImports,addWebpackAlias, addDecoratorsLegacy, adjustStyleLoaders  } = require('customize-cra');

module.exports = override(
  // antd按需加载，不需要每个页面都引入"antd/dist/antd.css"了
  fixBabelImports('import', {
    libraryName: 'antd-mobile', 
    libraryDirectory: "es",
    style: "css",
  }),
  // 配置路径别名
  addWebpackAlias({
    '@': path.join(__dirname,'./src/')
  }),
  // 装饰器：高阶组件的简便写法，例：@withRouter
  addDecoratorsLegacy(),
  // 全局暴露scss文件
  adjustStyleLoaders(rule => {
    if (rule.test.toString().includes('scss')) {
      rule.use.push({
        loader: require.resolve('sass-resources-loader'),
        options: {
          resources: './src/index.scss' // scss文件路径
        }
      });
    }
  }) 
);