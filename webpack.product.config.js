const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
	//文件入口
	entry: {
		main: './src/charts.js'
	},
	mode:'production',
	//文件出口
	output:{
		filename:'charts.js',
		path: path.join(__dirname, "dist")
	},
	//引入模块。babel-loader转换
	module:{
		rules:[
			{
	          test: /\.css$/,
	          use: [
	            'style-loader',
	            'css-loader'
	          ]
	        },
			{ 
			    test: /\.js$/, 
			    exclude: /(node_modules|bower_components)/,
			    use: {
			        loader: 'babel-loader',
			        options: {
			          presets: ['env']
			        }
			    },
			    exclude:path.resolve(__dirname,"node_modules"),
			    include:path.resolve(__dirname,"src")
			}
		]
	},
	plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            cache:false,
        })
    ],
	devtool: 'false', 
	devServer:{
		contentBase: './index.html',
		port:8080,
		compress:true,// 服务器压缩
		open:true// 自动打开浏览器
	}

}