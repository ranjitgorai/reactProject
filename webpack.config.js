var path = require('path');

module.exports = {
   entry:  [
      'webpack-dev-server/client?http://localhost:3000',
      './src/index.js'
    ],
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname,'public/build') ,
        publicPath: 'public/build',
        filename: 'bundle.js'
    },
    module: {
        rules : [
            {
                test: /\.js$/,
                exclude: /node_modulesy/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-react','@babel/env',{
                        'plugins': ['@babel/plugin-proposal-class-properties']}]
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader'
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                  modules: true
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader'
                  },
                ],
            }
        ]
    }, devServer: {
        publicPath: "/",
        contentBase: "./public",
        hot: true
    }
}
