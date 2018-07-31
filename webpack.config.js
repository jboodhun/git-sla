var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

require("shelljs/global");

var buildPath = '/';

// I use the rm command that is provide by the module "shellsjs/global"
rm("-rf", "dist");

module.exports = {
  // Tell Webpack which file kicks off our app.
  entry: {
    'main': path.resolve(__dirname, 'app/src/index.js')
  },
  // Tell Weback to output our bundle to ./dist/bundle.js
  // bundle.js is the file that combines all you node.js modules transpiled
  // into Normal Javascript that can be read by the browser.
  output: {
    filename: 'bundle.js',
    publicPath: buildPath,
    path: path.resolve(__dirname, 'dist')
  },
  // Tell Webpack which directories to look in to resolve import statements.
  // Normally Webpack will look in node_modules by default but since we’re overriding
  // the property we’ll need to tell it to look there in addition to the
  // bower_components folder.
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'app/bower_components')
    ]
  },
  // These rules tell Webpack how to process different module types.
  // Remember, *everything* is a module in Webpack. That includes
  // CSS, and (thanks to our loader) HTML.
  module: {
    loaders: [
      {
        test: /\.(js)$/,
        loader: "babel",
        query: {
            presets: ['react', 'es2015', "stage-0", "stage-3", "stage-2", "react-app"]
        }
      }
    ],
    rules: [
      {
        // If you see a file that ends in .html, send it to these loaders.
        test: /\.html$/,
        exclude: /(node_modules)/,
        // This is an example of chained loaders in Webpack.
        // Chained loaders run last to first. So it will run
        // polymer-webpack-loader, and hand the output to
        // babel-loader. This let's us transpile JS in our `<script>` elements.
        use: [
          { loader: 'babel-loader' },
          { loader: 'polymer-webpack-loader' }
        ]
      },
      {
        // If you see a file that ends in .js, just send it to the babel-loader.
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        // If you see a file that ends in .js, just send it to the babel-loader.
        test: /(\.scss|\.css)$/,
        use: [ 'style-loader', 'css-loader'],
      }
    ]
  },
  // Enable the Webpack dev server which will build, serve, and reload our
  // project on changes.
  // Specify the port to run the app on localhost.
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    historyApiFallback: true // This makes the path dynamic and in static mode it will work.
  },
  plugins: [
    // This plugin will generate an index.html file for us that can be used
    // by the Webpack dev server. We can give it a template file (written in EJS)
    // and it will handle injecting our bundle for us.

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'app/src/index.ejs'),
      inject: false
    }),

    // This plugin will copy files over for us without transforming them.
    // That's important because the custom-elements-es5-adapter.js MUST
    // remain in ES2015.
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'app/bower_components/webcomponentsjs/*.js'),
      to: 'bower_components/webcomponentsjs/[name].[ext]'
    }]),

    // Move files out of your bower bower_components
    // Or node modules into your dist directory
    // to server for your app.
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'app/bower_components/font-awesome/css/font-awesome.min.css'),
      to: 'css/[name].[ext]'
    }]),

    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'app/bower_components/jquery/dist/jquery.min.js'),
      to: 'bower_components/jquery/dist/[name].[ext]'
    }]),

    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'app/bower_components/bootstrap/dist/js/bootstrap.min.js'),
      to: 'bower_components/bootstrap/dist/js/[name].[ext]'
    }]),

    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'app/bower_components/bootstrap/dist/css/bootstrap.min.css'),
      to: 'bower_components/bootstrap/dist/css/[name].[ext]'
    }]),

    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'app/bower_components/underscore/*.js'),
      to: 'bower_components/underscore/[name].[ext]'
    }]),

    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'app/css/*'),
      to: 'css/[name].[ext]'
    }]),

    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'app/images/*'),
      to: 'images/[name].[ext]'
    }])

  ]
};
