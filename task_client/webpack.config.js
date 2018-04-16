var config = {
   entry: './main.js',
   output: {
      path:'/',
      filename: 'index.js',
   },
   devServer: {
      inline: true,
      port: 8080
   },
   plugins: [
    // ...
    function()
    {
        this.plugin("done", function(stats)
        {
            if (stats.compilation.errors && stats.compilation.errors.length)
            {
                console.log(stats.compilation.errors);
                process.exit(1);
            }
            // ...
        });
    }
    // ...
],
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         }
         ,
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
      ]
   }
}
module.exports = config;


