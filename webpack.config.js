const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const flexboxExtract = new ExtractTextPlugin('flex.css');
const ExtractText = new ExtractTextPlugin('[name].css');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [{
      use: 'babel-loader',
      exclude: /node_modules/,
      test: /\.js$/
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ExtractText.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'autoprefixer-loader'
        }, {
          loader: 'sass-loader'
        }]
      })
    }, {
      use: [
	          {
	            loader: 'url-loader',
	            options: {
	            	limit: 10000,
	            	outputPath: 'images/'
	            }
	          },
	          'image-webpack-loader'
	        ],
      exclude: /node_modules/,
      test: /\.(gif|jpe?g|png|svg)(\?.*)?$/
    }, {
      test: /\.css$/,
      include: /flexboxgrid/,
      use: flexboxExtract.extract(['css-loader'])
    },
    {
      use: [
	          {
	            loader: 'file-loader',
	            options: {
	            	outputPath: 'fonts/'
	            }
	          }
	        ],
      exclude: /node_modules/,
      test: /\.(woff2|woff|eot|ttf)$/
    }]
  },
  devServer: {
    port: 2020,
    historyApiFallback: true
  },
  plugins: [
    ExtractText,
    flexboxExtract,
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};

module.exports = config;
