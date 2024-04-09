module.exports={
  pages: {
    'index' : {
      'entry' : './src/pages/home/main.js',
      'template ' : 'public/index.html',
      'title' : 'MusicSpace',
      'chunks' : ['chunk-vendors','chunk-common', 'index']
    },
    'confirmation' : {
      'entry' : './src/pages/confirmation/main.js',
      'template ' : 'public/index.html',
      'title' : 'Account Confirmation',
      'chunks' : ['chunk-vendors','chunk-common', 'confirmation']
    }
  },
  publicPath: process.env.VUE_APP_NODE_ENV === 'test' ? '/static/' : '/',
  devServer: {
    disableHostCheck: true,
    port: 8080
  }
}
