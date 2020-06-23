/** @format */

module.exports = {
  parser: '@typescript-eslint/parser', //定义ESLint的解析器
  extends: ['prettier/@typescript-eslint', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'], //定义文件继承的子规范
  plugins: ['@typescript-eslint'], //定义了该eslint文件所依赖的插件
  env: {
    //指定代码的运行环境
    browser: true,
    node: true
  },
  rules: {
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        multiline: {
          delimiter: 'none', // 'none' or 'semi' or 'comma'
          requireLast: true
        },
        singleline: {
          delimiter: 'semi', // 'semi' or 'comma'
          requireLast: false
        }
      }
    ],
    '@typescript-eslint/no-namespace': false
  }
}
