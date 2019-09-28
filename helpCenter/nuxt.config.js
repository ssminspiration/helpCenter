const webpack = require('webpack');
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
      '~assets/index.css',
      '~assets/iconfont/iconfont.css',
      "~assets/main.css"
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
      "~plugins/axios.js",
      "~plugins/ecommerce.js",
      "~plugins/scroll.js",

    //   "~plugins/pagination.js"
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    //   "@nuxtjs/axios"
  ],
//   axios:{
//     prefix:'/api/',
//     proxy:true
//   },
//   proxy:{
//     "/api/":{
//         target:"http:localhost:3000",
//         pathRewrite:{
//             "^/api/":""
//         }
//     }
//   },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },

    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery'
        })
    ]


  }
}
