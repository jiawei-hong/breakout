const path = require("path");

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'public')
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.ts$/i,
                loader: "ts-loader"
            },
        ]
    },
    resolve: {extensions: [".ts", ".js"]},
};