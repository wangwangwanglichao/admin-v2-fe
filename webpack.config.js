const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let WEBPACK_ENV = process.env.WEBPACK_ENV || "dev";

console.log(WEBPACK_ENV);
console.log(process.env.WEBPACK_ENV);

module.exports = {
   entry: './src/app.jsx',
   output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: WEBPACK_ENV === "dev" ? '/dist/' : "//s.jianliwu.com/admin-ve/fe/dist/",
      filename: 'js/app.js'
   },
   // 配置路径别名
   resolve: {
      alias: {
         page: path.resolve(__dirname, "src/page"),
         component: path.resolve(__dirname, "src/component"),
         util: path.resolve(__dirname, "src/util"),
         service: path.resolve(__dirname, "src/service")
      }
   },
   module: {
      rules: [
         // js的配置
         {
            test: /\.jsx$/,
            exclude: /(node_modules)/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['env', 'react']
               }
            }
         },
         // css的配置
         {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
               fallback: "style-loader",
               use: "css-loader"
            })
         },
         // sass的配置
         {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
               fallback: 'style-loader',
               use: ['css-loader', 'sass-loader']
            })
         },
         // 图片的配置
         {
            test: /\.(png|jpg|gif)$/,
            use: [
               {
                  loader: 'url-loader',
                  options: {
                     limit: 8192,
                     name: 'resource/[name].[ext]'
                  }
               }
            ]
         },
         // 字体图标的配置
         {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            use: [
               {
                  loader: 'url-loader',
                  options: {
                     limit: 8192,
                     name: 'resource/[name].[ext]'
                  }
               }
            ]
         }
      ]
   },
   plugins: [
      // 处理HTML文件
      new HtmlWebpackPlugin({
         template: './src/index.html',
         favicon: "./favicon.ico"
      }),
      // 独立CSS文件
      new ExtractTextPlugin("css/[name].css"),
      // 提出公共模块
      new webpack.optimize.CommonsChunkPlugin({
         name: 'common',
         filename: 'js/base.js'
      })
   ],
   devServer: {
      port: 8086,
      historyApiFallback: {
         index: '/dist/index.html'
      },
      // url劫持,跨域处理
      proxy: {
         '/manage': {
            target: 'http://admintest.happymmall.com',
            changeOrigin: true
         },
         '/user/logout.do': {
            target: 'http://admintest.happymmall.com',
            changeOrigin: true
         }
      }
   }
};
