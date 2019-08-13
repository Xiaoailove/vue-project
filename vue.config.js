const path = require('path')
// __dirname: 内置代表当前文件的文件夹的绝对路径
/* 
根据目录/文件夹名得到其对应的绝对路径
*/
function resolve(dir) {
  return path.resolve(__dirname, dir)
}
module.exports = {
  configureWebpack: { // 编写webpack配置
    resolve: {
      extensions: ['.js', '.vue', '.json'], // 自动添加的文件扩展名
      alias: { // 模块路径别名
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        'components': resolve('src/components'),
        'pages': resolve('src/pages'),
      }
    }
  },
  //配置开发服务中的代理类似于react中在package.json文件中配置（用来解决跨域问题 ）
  devServer: {
    //比较复杂的配置方法，这种方法可以用于同一个项目但是需要请求几个不同的服务器且需要解决跨域问题
    proxy:{
      //利用指定路径的形式当我们请求的时候也就是来找代理服务器这一阶段的时候带着‘/api’的就直接访问4000端口（例子）
      //带着‘/baidu’的就直接访问百度的服务器（例子）
      '/api': {
        target: 'http://localhost:4000', // 转发的目录地址
        changeOrigin: true, // 支持跨域
         pathRewrite: { // 找到代理服务器之后需要重写路径: 让代理服务在转发请求前, 对路径进行特定修改
          //（因为服务器那边没人处理带'/api'的路径）
           '^/api': '', // 去掉路径中的/api
         },
      },
      '/baidu': {
        target: 'http://www.baidu.com',
        changeOrigin: true,
        pathRewrite: { 
          '^/baidu': '',
        },
      },
      
    }
  }
}