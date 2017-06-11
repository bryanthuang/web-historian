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
    if (req.url === '/') {
      fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', (err, data) => {
        if (err) {
          throw err;
        } else {
          res.end(data);
        }
      });   
    } else {
      archive.isUrlInList(req.url, exists => {
        if (exists) {
          archive.isUrlArchived(req.url, exists => {
            if (exists) {
              fs.readFile(archive.paths.archivedSites + '/' + req.url, 'utf8', (err, data) => {
                if (err) {
                  throw err;
                } else {
                  res.end(data);
                }
              });
            }
          });
        } else {
          archive.addUrlToList(req.url);
          fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf8', (err, data) => {
            if (err) {
              throw err;
            } else {
              res.end(data);
            }
          });
        }
      });
    }
    
    console.log(req.url);
  } else if (req.method === 'POST') {
  } else {
    statusCode = 404;
    res.end();
  }
  
  // if (req.method === 'POST') {
  //   console.log('posting')
  //   // 
  // }
};
