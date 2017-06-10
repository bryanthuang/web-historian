var path = require('path');
var archive = require('../helpers/archive-helpers');
// var halp = require('../web/http-helpers');
var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var statusCode; 

  if (req.method === 'GET') {
    statusCode = 200;
    // req.writeHead(statusCode, halp.headers);
    fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', (err, data) => {
      if (err) {
        throw err;
      } else {
        res.end(data);
      }
    });
  } else if(req.method === 'POST') {
    
  } else {
    statusCode = 404;
    res.end();
  }
  
  // if (req.method === 'POST') {
  //   console.log('posting')
  //   // 
  // }
};
