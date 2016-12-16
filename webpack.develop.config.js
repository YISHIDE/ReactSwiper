/**
 * Created by 80474 on 2016/11/30.
 */
var path = require('path');
module.exports = {
    //项目入口文件
    entry:['webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname,'develop/app.js')],
    //输出的文件路径
    output: {
        path: path.resolve(__dirname, 'publish'),
        filename: 'bundle.js',//输出的文件名
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
                test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx后缀名的文件
                loader: 'babel',// 加载模块 "babel" 是 "babel-loader" 的缩写
                query: {
                    presets: ['es2015', 'react','stage-0','stage-1','stage-2','stage-3']
                }
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.(png|jpeg|gif|jpg)$/,
                loader: 'file-loader?name=images/[name].[ext]'
            }
            //{
            //    test: /\.(png|jpg)$/,
            //    loader: 'url?limit=25000'
            //}
        ]
    }
}
