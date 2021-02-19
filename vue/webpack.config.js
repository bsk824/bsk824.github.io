const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (env, options) => {
	const config = {
		devtool: 'source-map',
		devServer: {
			host: "localhost"
		},
		resolve: {
			extensions: ['.js', '.vue'],
		},
		entry: {app: path.join(__dirname, 'main.js')},
		output: {
			filename: '[name].js',
			path: path.join(__dirname, 'dist'),
			publicPath: '/dist/',
		}
	}
	if(options.mode === 'development') {
		config.module = {
			rules: [{
				test: /\.vue$/,
				use: 'vue-loader',
			}, {
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					{
						loader: 'css-loader',
						options: {
							esModule: false,
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							sassOptions: {
								outputStyle: 'compressed',
							}
						}
					},
				]
			}, {
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				loader: 'url-loader?limit=100000',
			}],
		}
		config.plugins = [
			new VueLoaderPlugin(),
		]
	} else {
		config.module = {
			rules: [{
				test: /\.vue$/,
				use: 'vue-loader',
			}, {
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							esModule: false,
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							sassOptions: {
								outputStyle: 'compressed',
							}
						}
					},
				]
			}, {
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				loader: 'url-loader?limit=100000',
			}],
		}
		config.plugins = [
			new VueLoaderPlugin(),
			new MiniCssExtractPlugin({ filename: '/style.css' }),
		]
	}
	return config;
}