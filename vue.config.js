const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000,
    host: 'localhost',
    // proxy: {
    //     target: "http://localhost:8080"
    //   }
    }
})

