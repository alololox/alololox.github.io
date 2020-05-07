const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, arg) => {
  const dev = arg.mode !== "production";
  return {
    output: {
      path: path.resolve(__dirname),
      filename: "[name].[hash].js",
      chunkFilename: "[id].[hash].js",
    },
    mode: arg.mode,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            "file-loader",
            {
              loader: "image-webpack-loader",
              options: {
                bypassOnDebug: true,
                disable: true,
              },
            },
          ],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
            },
          ],
        },
        {
          test: /\.module\.s(a|c)ss$/,
          loader: [
            dev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: true,
                sourceMap: dev,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: dev,
              },
            },
          ],
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: /\.module.(s(a|c)ss)$/,
          loader: [
            dev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: dev,
              },
            },
          ],
        },
      ],
    },
    devServer: {
      historyApiFallback: true,
      host: "192.168.1.66", //your ip address
      port: 8080,
      disableHostCheck: true,
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[id].[hash].css",
      }),
    ],
  };
};
