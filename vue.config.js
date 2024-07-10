const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    disableHostCheck: true,
    public: 'sportfirst.onrender.com',
    port: 8080,
    host: '0.0.0.0'
  }
})

