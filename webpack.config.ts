import * as webpack from "webpack";
import * as path from "path";
import getBabelConfig from "./babel.config";
import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";

let projectRootPath = path.resolve(__dirname);

export default function(env: any, argv: any) {
  let modules = false;
  let pkg = require(path.join(process.cwd(), "package.json"));

  let babelConfig = getBabelConfig(modules || false);

  let config: webpack.Configuration = {
    mode: "development",
    entry: {
      [`${pkg.name}.min`]: path.resolve(projectRootPath, "./src/index")
    },
    output: {
      path: path.resolve(projectRootPath, "./dist"),
      filename: "[name].js"
    },
    devtool: "source-map",
    resolve: {
      modules: ["node_modules", path.join(__dirname, "../node_modules")],
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      alias: {
        [pkg.name]: process.cwd()
      }
    },
    target: "web",
    node: ["child_process", "fs", "module", "net"].reduce(
      (last, curr) => Object.assign({}, last, { [curr]: "empty" }),
      {}
    ),
    // externals: {
    //   moment: "moment",
    //   react: "react",
    //   "react-dom": "react-dom",
    //   lodash: "lodash"
    // },
    module: {
      noParse: [/moment.js/],
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: babelConfig
        },
        {
          test: /\.tsx?$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: "babel-loader",
              options: babelConfig
            },
            // {
            //   options: {
            //     fromLoader: "ts-loader"
            //   }
            // },
            { loader: "ts-loader", options: { transpileOnly: true } }
          ]
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                //modules: true
              }
            }
          ]
        },
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: true
              }
            },
            {
              loader: path.resolve(
                projectRootPath,
                "./build-tools/loaders/lessToCss-loader.js"
              )
            },
            {
              loader: "less-loader",
              options: {}
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|png|svg|gif|jpe?g)$/,
          exclude: /node_modules/,
          loader: "url-loader",
          options: {
            // name: "[chunkhash:8].[name].[ext]",
            name: "[name].[ext]",
            outputPath: "imgs/",
            limit: 120
          }
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: "initial",
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0
          },
          vendor: {
            test: /node_modules/,
            chunks: "initial",
            name: "vendor",
            priority: 10,
            enforce: true
          }
        }
      },
      runtimeChunk: true
    },

    plugins: [
      new CleanWebpackPlugin(["dist"]),
      // new UglifyjsWebpackPlugin({
      //   parallel: true,
      //   uglifyOptions: {
      //     ecma: 6
      //   }
      // }),
      new HtmlWebpackPlugin({
        title: "learn Webpack",
        template: "./public/index.html"
      }),
      // new webpack.ProgressPlugin((percentage, msg, addInfo) => {
      //   const stream = process.stdout;
      //   if (stream.isTTY && percentage < 0.71) {
      //     stream.write(
      //       `${chalk.magenta(msg)} (${chalk.magenta(addInfo || "")})\n`
      //     );
      //   } else if (percentage === 1) {
      //     console.log(chalk.green("\nwebpack: bundle build is now finished."));
      //   }
      // }),
      // new webpack.optimize.ModuleConcatenationPlugin(),

      // new webpack.DefinePlugin({
      //   "process.env.NODE_ENV": JSON.stringify("Hellow")
      // }),
      new MiniCssExtractPlugin({
        filename: "[chunkhash:8].[name].css",
        chunkFilename: "[id].css"
      })
    ],
    devServer: {
      port: 9000,
      open: true,
      publicPath: "/"
    }
  };

  return config;
}
