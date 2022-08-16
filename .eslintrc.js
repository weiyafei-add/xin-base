module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "prettier",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest"
    },
    "plugins": [
        "react",
    ],
    "settings": {
        react: {
            version: 'detect'
        }
    },
    "rules": {
        "no-undef": 0,
        "no-alert": 0,
        "no-var": 2,
        "@typescript-eslint/no-explicit-any": 0,
    }
}
