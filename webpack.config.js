const { resolve } = require('path') 

module.exports = {
	mode: 'development',
	devServer: {
		contentBase: resolve(__dirname, 'dist'),
		port: 3000,
		open: true
	}
}