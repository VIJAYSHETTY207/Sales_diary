var serverUrl =[];
var serverPath =[];
if(JSON.stringify(process.env.NODE_ENV === 'production')){
    serverUrl['url'] = "http://salesdiary.egenius.in/server/";
    serverUrl['path'] = "http://salesdiary.egenius.in/server/";
	// serverUrl['url'] = "http://calculator.egenius.in/server/";
    // serverUrl['path'] = "http://calculator.egenius.in/server/";       
}else{
  serverUrl['url'] = "http://localhost:3000/server/Api";
  serverUrl['path'] = "http://localhost:3000/server";
}

// serverUrl['url'] = "http://localhost/server/public/";   
// serverUrl['path'] = "http://localhost/server/public/";   
 
export default serverUrl;      