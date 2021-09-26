const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 8080,
    },
    module: {
        rules: [{
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader',
            ],
        }]
    },
    target: 'web'
};