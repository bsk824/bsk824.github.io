const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
	mode: 'development',
	devtool: 'eval',
	resolve: {
		extensions: ['.js', '.vue', '.scss'],
	},
	entry : {
		app: path.join(__dirname, 'main.js'),
	},
	module : {
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
				}
			]
		}, {
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			loader: 'url-loader?limit=100000',
		}],
	},
	plugins: [
		new VueLoaderPlugin(),
	],
	output: {
		filename: '[name].js',
		path: path.join(__dirname, 'dist'),
		publicPath: '/dist/',
	}
}