const path = require("path");
const { allowedNodeEnvironmentFlags } = require("process");

const webpackConfig = {
	entry: path.resolve(__dirname, "src", "index.js"),

	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset"
			}
		]
	},

	optimization: {
		splitChunks: {
			chunks: "async",
			cacheGroups: {
				node_vendors: {
					name:"vendor",
					test: /[\\/]node_modules[\\/]/,
					chunks: "all",
					priority: 1,
				}
			}
		}
	},

	mode: "production"
};

module.exports = webpackConfig;
