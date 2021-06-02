import {defineConfig} from 'umi';
import {lessVariables} from "ng-lib-tsx/lib/theme";

let productionConfig: any = {};
if (process.env.NODE_ENV === "production") {
  const CompressionWebpackPlugin = require("compression-webpack-plugin");
  productionConfig = {
    hash: true,
    chunks: ["lib", "umi"],
    chainWebpack: function(config, { webpack }) {
      config.merge({
        optimization: {
          minimize: true,
          splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            automaticNameDelimiter: ".",
            cacheGroups: {
              lib: {
                // 基础库(ant\ng-lib-tsx)
                name: "lib",
                chunks: "all",
                test({ resource }) {
                  return /[\\/]node_modules[\\/](react|react-dom|react-dom-router|@antd|antd|@ant-design|ng-lib-tsx)/.test(resource);
                },
                priority: 99
              },
              vendors: {
                // 异步包
                name: "vendors",
                chunks: "async",
                minChunks: 2,
                priority: 50
              }
            }
          }
        }
      });
      config.plugin("compression-webpack-plugin").use(
        new CompressionWebpackPlugin({
          algorithm: "gzip", // 指定生成gzip格式
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, // 匹配哪些格式文件需要压缩
          threshold: 10240, //对超过10k的数据进行压缩
          minRatio: 0.6 // 压缩比例，值为0 ~ 1
        })
      );
    }
  };
  if (process.env.NG_BUILD === "1") {
    // 发布的时候去除layout，仅发布子路由
    productionConfig.routes = [];
  }
}

export default defineConfig({
  publicPath: './',
  title: 'abc',
  base: "/",
  nodeModulesTransform: {
    type: "none"
  },
  history: { type: "hash" },
  theme: lessVariables,
  antd: {},
  dva: {},
  dynamicImport: {
    loading: "@/components/pageLoading"
  },
  routes: [
    { path: "/", component: "@/pages/layout", routes: [] }
  ],
  proxy: {
    "/proxy": {  // 已api开头的请求自动代理
      target: "http://10.18.20.22:22000", // 代理的真实请求地址
      pathRewrite: { "^/proxy": "" },
      changeOrigin: true
    },
    ...['/filesrv', '/NG3Resource', '/Resource', '/Log', '/api/WorkFlow3', '/WorkFlow3'].reduce(
      (p, c) => ({
        ...p,
        [c]: {
          target: 'http://localhost:8888',
          changeOrigin: true
        }
      }),
      {}
    )
  },
  ...productionConfig
});
