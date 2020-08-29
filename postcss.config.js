module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 320, // 视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight: 668, // 视窗的高度，对应的是我们设计稿的高度（也可以不配置）
      unitPrecision: 5, // 执行'px'转换为视窗单位值的小数位数（很多时候可能无法整除）
      viewportUnit: 'vw', // 只当需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['ignore', 'tab-bar'], // 指定不需要转换的类(这个可能也是正则)
      minPixelValue: 1, // 小于或者等于1px不转化为视窗单位
      mediaQuery: false, // 语序在媒体查询中转换'px'
      exclude: [/TabBar/], // 使用正则表达式排除一些组件
    }
  }
}

// 1.在js中使用正则: /正则相关规则/
// 2.exclude中存放的元素必须是正则表达式
// 3.按照排除的文件写对应的正则:
