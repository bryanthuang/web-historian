var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!
var urlArr;

exports.readListOfUrls = function(callback) {
  //loop throujgh list
  fs.readFile(this.paths.list, 'utf8', (err, data) => {
    urlArr = data.split('\n');
    callback(urlArr);
  });
};

exports.isUrlInList = function(url, callback) {
  this.readListOfUrls(existingUrls => {
    callback(existingUrls.includes(url));
  });
};

exports.addUrlToList = function(url, callback) {

  fs.appendFile(this.paths.list, url + '\n', (err) => {
    if (err) {
      throw err;
    } else {
      callback();
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  //checks if html files already exist in sites folder
  fs.stat(this.paths.archivedSites + '/' + url, (err, stat) => {
    if (err) {
      // console.log(stat);
      callback(false);
    } else {
      callback(true);
    }
  });
};

exports.downloadUrls = function(urls) {
  //download html files from site
};
