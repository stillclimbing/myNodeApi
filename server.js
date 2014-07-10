var restify = require('restify');
var http = require('http');

//init restify server
var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser({
    mapParams: true
}));
server.use(restify.CORS());
server.use(restify.fullResponse());


server.get('/stillclimbing/rest/wikipediaApi', function handler(req, res, next) {
    var title = req.params.title;

    var options = {
        host: 'en.wikipedia.org',
        port: 80,
        path: '/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=' + title,
        headers: {
            'User-Agent': 'MyCoolTool/1.1 (xiaoming_t@hotmail.com)'
        }
    };
    var str = '';
    http.get(options, function(response) {
        response.on('data', function(chunk) {
            str += chunk;
        });

        response.on('end', function() {
            res.send(JSON.parse(str));
            return next();
        });
    }).on("error", function(e) {
        console.log("Got error: " + e.message);
        return next();
    });
});


//-------------------------------static files-----------------------------
// Static files are served in nodejs using restify
// this is a temporary solution to host both REST API and web content in one server
// in future, static files should be moved to a more dedicate web server such as apache or nginx or CDN
server.get(/\/?.*/, restify.serveStatic({
    directory: './static'
}));


server.listen(9010, function() {
    console.log('%s listening at %s', server.name, server.url);
});