module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000', //设置调用的接口域名和端口号（默认端口号80）
          changeOrigin: true, //
          pathRewrite: {
            '^/api': ''
          }

        }
      }
    }
  },
  lintOnSave: false
}
