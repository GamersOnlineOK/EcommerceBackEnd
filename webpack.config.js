module.exports={
    // entry: es desde donde va a leer los arhivos a traducir por webpack
    entry:'/src/app/index.js',
    // output: indicamos la ruta y archivo donde se van a traducir estos archivos
    output:{
        path:__dirname + '/src/public',
        filename:'bundle.js'
    },
    // configuramos webpak para que traduzca react
    module:{
        rules:[
            {
              use:'babel-loader',
              test: /\.js$/,
              exclude:/node_modules/
            }
            
        ]
    }
    
}