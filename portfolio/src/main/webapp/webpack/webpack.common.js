const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: [
        Path.resolve(__dirname, '../src/scripts/index.js')
    ]
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../public'), to: 'public' },
      { from: Path.resolve(__dirname, '../WEB-INF'), to: 'WEB-INF' }
    ]),
    // TODO: Move panel to a partial and use
    new HtmlWebpackPlugin({
        filename: "panel.html",
      template: Path.resolve(__dirname, '../src/panel.html')
    }),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/index.html')
    }),
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [

      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /src\/.+\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      },
    ]
  }
};
