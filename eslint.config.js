import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  module.exports = {
    // 确保其他配置部分保持不变
    rules: {
      // 禁用React必须在JSX作用域中的规则
      "react/no-unknown-property": "off"
    }
  }
];