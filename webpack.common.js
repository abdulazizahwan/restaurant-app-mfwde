const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      ],
    },
    {
      test: /\.s[ac]ss$/,
      use: [
        // Creates `style` nodes from JS strings
        'style-loader',
        // Translates CSS into CommonJS
        'css-loader',
        // Compiles Sass to CSS
        'sass-loader',
      ],
    },
    {
      test: /\.(svg|png|jp(e*)g|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'images',
        },
      }],
    },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/public/'),
        to: path.resolve(__dirname, 'dist/'),
      }],
    }),
    new HtmlWebpackInlineSVGPlugin(),
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, 'src/scripts/sw.js'),
    }),
  ],
};
