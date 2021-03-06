module.exports = {
    // publicPath: process.env.NODE_ENV === 'production'
    //     ? '/lava/'
    //     : '/',

    publicPath: './',

    devServer: {
        port: 3000,
        // https: true,
        proxy: {
            '/api': {
                target: 'https://localhost:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    },

    pluginOptions: {
      i18n: {
        locale: 'en',
        fallbackLocale: 'en',
        localeDir: 'locales',
        enableInSFC: true
      }
    }
};
