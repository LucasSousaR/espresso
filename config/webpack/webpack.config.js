// See the shakacode/shakapacker README and docs directory for advice on customizing your webpackConfig.
const { generateWebpackConfig } = require('shakapacker')
const webpack = require('webpack')
const webpackConfig = generateWebpackConfig()


// Adiciona o ProvidePlugin para jQuery
webpackConfig.plugins.push(
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        Popper: ['popper.js', 'default']
    })
)
// Adiciona regra para o imports-loader para jQuery e DataTables
webpackConfig.module.rules.push({
    test: require.resolve('datatables.net-bs4'),
    use: [{
        loader: 'imports-loader',
        options: {
            imports: {
                moduleName: 'jquery',
                name: 'jQuery'
            }
        }
    }]
});
module.exports = webpackConfig
