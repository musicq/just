webpack = require('webpack')
HtmlWebpackPlugin = require('html-webpack-plugin')
{CleanWebpackPlugin} = require('clean-webpack-plugin')
{exampleRoot, rootPath} = require('./helper')
ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

config =
  mode: 'development'

  devtool: 'inline-source-map'

  entry:
    main: exampleRoot('src/index.tsx')

  resolve:
    extensions: ['.ts', '.tsx', '.js']

  module:
    rules: [
      {
        test: /\.s[ac]ss$/
        use: [
          'style-loader'
          'css-loader'
          {
            loader: 'sass-loader'
            options:
              implementation: require('sass')
          }
        ]
      }
      {
        test: /\.tsx?$/
        loader: 'ts-loader'
        exclude: /node_modules/
        options:
          transpileOnly: true
          configFile: rootPath('tsconfig.json')
      }
    ]

  plugins: [
    new CleanWebpackPlugin()

    new HtmlWebpackPlugin(
      template: exampleRoot('src/index.html')
    )

    new ForkTsCheckerWebpackPlugin(
      typescript:
        configFile: rootPath('tsconfig.json')
    )

    new webpack.DefinePlugin({
      DEV: true,
    })
  ]

  devServer:
    port: 4000

module.exports = config
