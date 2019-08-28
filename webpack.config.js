const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve('./dist')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader-srcset',
          options: {
            attrs: ['img:src', 'img:srcset', 'source:srcset', ':data-src', ':data-srcset']
          }
        }
      },
      {
        test: /\.m?js$/,
        exclude: [/node_modules/],
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|webp)$/,
        exclude: [/favicons/],
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          },
        }
      },
      {
        test: /\.(png|xml|json|ico)$/,
        include: [/favicons/],
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          },
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      }
    ]
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
      logLevel: 'warn'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/about.html',
      filename: 'about/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/speaking.html',
      filename: 'speaking/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/built.html',
      filename: 'built/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new CompressionPlugin(),
  ],
  devtool: process.env.NODE_ENV === 'production' ? 'none' : 'source-map',
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    open: true
  }
};
