const path = require('path');

module.exports = {
    entry: './src/js/signUp.js',  // Adjust the path as per your project structure
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "util": require.resolve("util/"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer/"),
            "assert": require.resolve("assert/")
        },
        alias: {
            "firebase/app": "firebase/app/dist/index.cjs.js",
            "firebase/auth": "./src/firebase/auth"