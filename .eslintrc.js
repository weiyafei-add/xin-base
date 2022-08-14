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
    "rules": {
        "no-undef": 0,
    }
}
