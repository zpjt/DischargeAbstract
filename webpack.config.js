const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin"); 
const CleanDistPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = env =>{

  const id_dev = env === "development" ;
	return {
	  devtool: id_dev ? "eval-source-map" : "source-map",
		entry:{
			main:path.join(__dirname,"src/App.tsx"),
			login:path.join(__dirname,"src/Login.tsx"),
		},
		output:{
			path:path.join(__dirname,"static"),
			filename:"[name].js",
			publicPath:"/",
			chunkFilename:id_dev ? 'js/[name].[chunkhash:5].chunk.js' :'js/[name].chunk.js',
		},
		mode:env,	
		module:{
			rules:[
				{
					test:/\.tsx?$/,
				//	 test: /(?<!\.d)\.tsx?$/,
					//exclude: /node_modules|assert/, // 排除不处理的目录
					exclude: /assert/, // 排除不处理的目录
			//	  include: path.resolve(__dirname, 'src'), // 精确指定要处理的目录
					use: [
							{
							loader: "ts-loader"
						}
					]	
				},
				/*{
				    test: /\.d\.ts$/,
				    loader: 'ignore-loader'
				},*/
				{
					test:/.(css|scss)$/,
					exclude: /assert/, // 排除不处理的目录
					//exclude: /node_modules|assert/, // 排除不处理的目录
				  //include: path.resolve(__dirname, 'src'), // 精确指定要处理的目录
				
					use: [

									!id_dev ? {
										loader:MiniCssExtractPlugin.loader,
										 options: {
								            sourceMap: true,
								            publicPath:"/",
								          }
									}:{
										loader:"style-loader",
										 options: {
								            sourceMap: true,
								          }
									},
									{
										loader:"css-loader",
										 options: {
								            sourceMap: true,
								          }
									},
									{
										loader:"sass-loader",
										options: {
            								sourceMap: true,
         								 }
									},
					]	
				},
				{
		      test: /\.(jpg|png|ico|jpeg|gif)$/,
		     // exclude: /assert/, // 排除不处理的目录
		      use: [{
		        loader: "url-loader",
		        options: {
		          name: "[name].[ext]",
		          limit:100,
		          publicPath: "../img/",
		          outputPath: "img/"
		        }
		      }]
		    },	
		    {
			      test: /\.(eot|svg|ttf|woff|woff2)$/,
			    //  exclude://,
			      use: [{
			        loader: "url-loader",
			        options: {
			         limit:5000,
			          name: "[name].[ext]",
			          publicPath: "../fonts/",
			          outputPath: "fonts/"
			        }
			   	   }]
				} 

			]
		},
		resolve: {
				extensions: ['.js', '.css', ".tsx",'.json',".scss",".ts"],
				modules: ['node_modules'],
			  plugins: [new TsconfigPathsPlugin({configFile: "./tsconfig.json"})],
				alias: { //配置绝对路径的文件名
		            css: path.join(__dirname, 'src/css'),
		            js: path.join(__dirname, 'src/js'),
		            api: path.join(__dirname, 'src/api'),
		            assert: path.join(__dirname, 'src/assert'),
		        },
		},
		optimization: {
			//minimize: false,
		  namedModules: true,
			namedChunks: true,
			chunkIds: 'named',
			moduleIds: 'named',
			runtimeChunk: {//包清单
				name: "manifest"
			},
			splitChunks: {
				automaticNameDelimiter:"*",
	      chunks: 'all',
	      // minSize: 30000,
	      // maxSize: 0,
	      minChunks: 2,
	      maxAsyncRequests: 5,
	      maxInitialRequests: 3,
	      name: id_dev,
	      cacheGroups: {
	        common: {//检查异步加载的公共代码
				        name: "common",
				        chunks: 'async', 
						    priority: 4,
						    minChunks: 2, 
	        },
	        asyncVendors: { //异步加载的第三方库
				        name: "asyncVendors",
			         	test: /[\\/]node_modules[\\/]/,
				        chunks: 'async', //检查异步加载的
						    priority: 4,
						    minChunks: 1, 
	        },
	         vendors: {//检查初始化的，同步加载的第三方库 (也就是entry里的js第一次加载时引入的)
   						 test: /[\\/]node_modules[\\/]/,
			         chunks:"initial" , 
				       name: "vendor",
				       priority: 2,
				   //    enforce: true,//强制检查打包，不管最小或最大的chunk限制
			         minChunks: 1,
					},
					commonMain:{
							test: /src/,
			         chunks:"initial" , 
				       name: "commonMain",
				       priority: 2,
			         minChunks: 2,
						
					}
	      },
    	}

		},
		plugins:[
			   new MiniCssExtractPlugin({
			      // Options similar to the same options in webpackOptions.output
			      // both options are optional
			      filename: id_dev ? 'css/[name].css' : 'css/[name].[hash].css',
			      chunkFilename: id_dev ? 'css/[id].css' : 'css/[id].[hash].css',
			    }),
				new htmlWebpackPlugin({
						title:"出院小结",
						filename:"index.html",
						inject:"body",
						hash:true,
						template:path.join(__dirname,"src/index.html"),
						chunks:["manifest","main","vendor","commonMain"]
				}),
				new htmlWebpackPlugin({
						title:"登录",
						filename:"login.html",
						inject:"body",
						hash:true,
						template:path.join(__dirname,"src/login.html"),
						chunks:["manifest","login","vendor","commonMain"]
				}),

				new CopyWebpackPlugin([
					{ from: './src/assert', to: './assert' },
				]),
				new CleanDistPlugin(),
			  new webpack.HotModuleReplacementPlugin(),//模块的热替换
	 		  new webpack.NamedModulesPlugin(), //热更新时显示更新的模块的名字，默认是模块的id
	 		  new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly

		],
		devServer: {
		        historyApiFallback: true,
		        contentBase:path.resolve(__dirname,'static'),
		        quiet: false, //控制台中不输出打包的信息
		        noInfo: false,
		        inline: true, //开启页面自动刷新,
		        hot:true,
		        hotOnly: true,//开启后，页面不会刷新，不然一改页面就会刷新
		        lazy:false,
		        publicPath:"/",
		        compress:true,
		        progress: false, //显示打包的进度
		        overlay:{  //把编译的错误显示在浏览器上
		            errors:true,
		            warnings:true,
		        },
		        watchOptions: {
		            aggregateTimeout: 300
		        },
		        clientLogLevel: "none", // cancel console client log
		        port: '8035', //设置端口号
		        openPage:"login.html",//导航页面
		        proxy: {
		             '/DischargSummary': {
		                target: 'http://localhost:8080',
		                secure: false,
		                changeOrigin:true,
					},
					 '/DischargSummary/WebSocket': {
						target: 'ws://localhost:8080',
		                ws:true,
		                secure: false,
	                    logLevel: 'debug',
		            }
		        }
    		},
	}
} 

