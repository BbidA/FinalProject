module.exports = {
  extends: ["@nuxtjs/eslint-config-typescript"],

  rules: {
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always"
      }
    ],
    'arrow-parens': ['error', 'as-needed']
  }
};
