module.exports = {

    entry:[
        './src/app.js'
    ],

    output: {
        path: require("path").resolve("./dist"),
        filename: 'bundle.js'
    },
    
    watch: true,

    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: 
                   {
  			"presets": ["es2015", "react", "stage-0"],
  			"plugins": ["transform-class-properties"]
                   }
            },
            {test: /\.css$/, loader: "style!css"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}  
        ]
    },

    devServer:{
        contentBase: require("path").resolve("./dist"),
        inline: true,
        historyApiFallback: true
    }
    
}
