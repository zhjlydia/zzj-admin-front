/** @format */

module.exports = {
  parser: '@typescript-eslint/parser', //定义ESLint的解析器
  extends: [
    'plugin:vue/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/vue'
  ],
  env: {
    //指定代码的运行环境
    browser: true,
    node: true
  },
  rules: {
    '@typescript-eslint/member-delimiter-style': 0
  }
}
