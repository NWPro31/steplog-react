module.exports = {
    "env": {
        browser: true,
        es2021: true
    },
    "extends": [
        'plugin:react/recommended'
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks"
    ],
    settings: {
        react: {
            version: 'detect'
        }
    },rules: {
        'react/jsx-filename-extension': [
            2,
            {extensions: ['.js', '.jsx', '.ts', '.tsx']}
        ],
        'react/jsx-props-no-spreading': ['off'],
        'react/jsx-indent': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-indent-props': 'off',
        'react/jsx-curly-newline': 'off',
        'react/prop-types': 'off',
        'import/no-unresolved': 'off',
        'no-param-reassign': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'import/prefer-default-export': 'off',
        'react/function-component-definition': 'off',
        'no-unused-vars ': ['off'],
        'import/extensions': 'off',
        'no-shadow': 'off',
        'no-use-before-define': 'off',
        'react/require-default-props': 'off',
        'no-promise-executor-return': 'off',
        'no-unused-vars': 'off'
    }
};