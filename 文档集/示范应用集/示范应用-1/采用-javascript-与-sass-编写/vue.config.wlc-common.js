const pathUtils = require('path')

const { env } = process

// 以下各值均不能套 JSON.stringify ！
// 一旦套用 JSON.stringify ，将得到一个字符串，字符串的内容首尾均有额外的英文双引号。
const {
    NODE_ENV,
} = env

module.exports = {
    buildVueConfig,
}

function buildVueConfig ({
    dev: {
        server: {
            defaultPort: devWebSiteDefaultPort,
        },
    },

    distribution: {
        outputRootFolderPath = 'dist',
        assetsRootFolderName = 'static',
    },

    webpackAliases: {
        decideMoreAliases,
    },
}) {
    if (NODE_ENV === 'development') {
        logLater('log a line')

        logLater('\n')
        logLater('NODE_ENV ：', NODE_ENV)
        logLater('\n')

        logLater('log a line')
    }

    return {
        // 部署生产环境和开发环境下的 URL 。
        publicPath: '',

        outputDir: outputRootFolderPath,
        assetsDir: assetsRootFolderName,

        // 是否开启eslint保存检测，有效值：ture | false | 'error'
        lintOnSave: NODE_ENV === 'development',

        // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
        productionSourceMap: false,

        // webpack-dev-server 相关配置
        devServer: {
            host: 'localhost',
            port: JSON.stringify(env.port || env.npm_config_port || devWebSiteDefaultPort),
            open: true,
        },

        configureWebpack: {
            resolve: {
                alias: {
                    '@': resolvePathOfThisProject('src'),
                    '~@': resolvePathOfThisProject('src'),
                },
            },
        },

        chainWebpack (webpackConfig) {
            if (typeof decideMoreAliases === 'function') {
                decideMoreAliases(webpackConfig, { NODE_ENV })
            }
        },
    }
}

function resolvePathOfThisProject (relativePath) { return pathUtils.join(__dirname, relativePath) }

function logLater (...args) {
    setTimeout(() => {
        if (args[0] === 'log a line') {
            console.log('-'.repeat(79))
        } else {
            console.log(...args)
        }
    }, 8 * 1000)
}
