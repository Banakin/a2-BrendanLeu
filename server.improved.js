const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

const appdata = [
  {
    "my_ship_name":"Earth Test Ship",
    "my_ship_id":"US_001",
    "opposing_ship_name":"Mars Test Ship",
    "opposing_ship_id":"MR_001",
    "start_month":"12",
    "start_day":"28",
    "start_year":"2086",
    "start_hour":"16",
    "start_minute":"86",
    "end_month":"1",
    "end_day":"3",
    "end_year":"2087",
    "end_hour":"3",
    "end_minute":"57",
    "damage_report":"One wing heavily damaged."
  }
]

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if ( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  } else if (request.url === "/api/data") {
    response.writeHeader( 200, { "Content-Type": "application/json" })
    console.log("asdfasdfasdfasdfasdfasdf")
    console.log(appdata)
    console.log(JSON.stringify(appdata))
    response.end(JSON.stringify(appdata))
  } else {
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
    console.log(data)
    dataString += data 
  })

  request.on( "end", function() {
    console.log( dataString )

    const params = new URLSearchParams(dataString);

    // Iterate through all keys and values
    appdata.push(Object.fromEntries(params))
    // for (const [key, value] of params.entries()) {
    //   console.log(key, value);
    // }
    console.log(appdata)


    // ... do something with the data here!!!

    sendFile( response, "public/index.html" )
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we"ve loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { "Content-Type": type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( "404 Error: File Not Found" )

     }
   })
}

console.log(`Server is hosted at http://localhost:${process.env.PORT || port}`)
server.listen( process.env.PORT || port )
