/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: ["plugin:vue/vue3-recommended", "eslint:recommended"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 2,
        multiline: {
          max: 1,
        },
      },
    ],
    "vue/script-setup-uses-vars": ["ignore"],
  },
}
