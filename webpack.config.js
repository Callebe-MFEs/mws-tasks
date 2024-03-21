const path = require("path");
const dev = require("./webpack.dev");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const deps = require("./package.json").dependencies;

module.exports = merge(
  common,
  merge(dev, {
    entry: {
      main: path.resolve(__dirname, "src/index.ts"),
    },
    mode: "development",
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "auto",
    },
    devServer: {
      static: [path.resolve(__dirname, "dist")],
      historyApiFallback: true,
      open: true,
      port: 3005,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "mwsTasks",
        filename: "remoteEntry.js",
        exposes: {
          "./mwsTasks": "./src/mfe",
        },
        shared: {
          lit: {
            requiredVersion: deps["lit"],
            strictVersion: true,
          },
          "lit-html": {
            requiredVersion: deps["lit-html"],
            strictVersion: true,
          },
          "lit-element": {
            requiredVersion: deps["lit-element"],
            strictVersion: true,
          },
        },
      }),
      new HtmlWebpackPlugin({
        title: "My Workspace - Tasks",
        template: path.resolve(__dirname, "src/index.html"),
      }),
    ],
  })
);
