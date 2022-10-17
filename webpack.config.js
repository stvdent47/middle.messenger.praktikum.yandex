const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DuplicatesPlugin } = require('inspectpack/plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    historyApiFallback: true,
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(svg|woff2?)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
    new DuplicatesPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.hbs'],
    alias: {
      api: path.resolve(__dirname, 'src/api'),
      components: path.resolve(__dirname, 'src/components'),
      'components-ui': path.resolve(__dirname, 'src/components-ui'),
      constants: path.resolve(__dirname, 'src/constants'),
      core: path.resolve(__dirname, 'src/core'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      hocs: path.resolve(__dirname, 'src/hocs'),
      models: path.resolve(__dirname, 'src/models'),
      pages: path.resolve(__dirname, 'src/pages'),
      services: path.resolve(__dirname, 'src/services'),
      static: path.resolve(__dirname, 'src/static'),
      store: path.resolve(__dirname, 'src/store'),
      styles: path.resolve(__dirname, 'src/styles'),
      tests: path.resolve(__dirname, 'src/tests'),
      typings: path.resolve(__dirname, 'src/typings'),
      utils: path.resolve(__dirname, 'src/utils'),
      handlebars: 'handlebars/dist/handlebars.min.js',
    },
  },
};
