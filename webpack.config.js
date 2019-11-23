const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
	mode: 'development',
	entry: `${path.resolve(__dirname, 'src')}/index.jsx`,
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
	},
	devServer: {
		contentBase: './dist',
		hot: true,
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: './src/index.html' },
			{ from: './src/assets' },
		]),
		new webpack.HotModuleReplacementPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.jsx?/,
				include: `${path.resolve(__dirname, 'src')}`,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};

module.exports = config;
