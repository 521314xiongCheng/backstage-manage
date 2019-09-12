module.exports = {
  publicPath:'./',
  outputDir:'dist',
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  },
  devServer:{
    port:8080,
    host:'localhost',
    open:true,
  }
}
