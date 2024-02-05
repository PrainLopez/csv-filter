module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "plugins": ["jquery", "prettier"],
    "extends": ["eslint:recommended", "plugin:prettier/recommended","plugin:jquery/slim"],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
    }
}
