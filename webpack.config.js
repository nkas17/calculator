const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const config = {
	mode: "development",
	entry: `${path.resolve(__dirname, 'src')}/index.jsx`,
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
	},
	output: {
		path: path.resolve(__dirname, "dist"),
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: './src/index.html' }  
		]),  
	],
	module: {
		rules: [{
			test: /\.jsx?/,
			include: `${path.resolve(__dirname, 'src')}`,
			use: {
					loader: 'babel-loader'
			}
		}]
	}
};

module.exports = config;
