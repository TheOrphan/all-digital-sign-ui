/* eslint-disable */
const withLess = require("@zeit/next-less");
const lessToJS = require("less-vars-to-js");
const fs = require("fs");
const path = require("path");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
require("dotenv").config();

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, "./assets/antd.variables.less"),
    "utf8"
  )
);

module.exports = withLess({
  plugins: [new AntdDayjsWebpackPlugin()],
  env: {
    URL: process.env.URL,
    BE: process.env.BE,
    INITIAL_PAGES: process.env.INITIAL_PAGES,
    SIGN_ADAPTER_URL: process.env.SIGN_ADAPTER_URL,
    SIGN_ADAPTER_DEST: process.env.SIGN_ADAPTER_DEST,
    SIGN_ADAPTER_STAMP: process.env.SIGN_ADAPTER_STAMP,
    SIGN_ADAPTER_RAW: process.env.SIGN_ADAPTER_RAW,
    AWS_BUCKET: process.env.AWS_BUCKET,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    PERURICA_LOGIN_URL: process.env.PERURICA_LOGIN_URL,
    PERURICA_STAMP_URL: process.env.PERURICA_STAMP_URL,
    PERURICA_PROFILE_NAME: process.env.PERURICA_PROFILE_NAME,
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables, // make your antd custom effective
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === "function") {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader",
      });
    }

    config.resolve.alias["assets"] = path.join(__dirname, "assets");
    config.resolve.alias["components"] = path.join(__dirname, "components");
    config.resolve.alias["modules"] = path.join(__dirname, "modules");
    config.resolve.alias["utils"] = path.join(__dirname, "utils");

    return config;
  },
});
