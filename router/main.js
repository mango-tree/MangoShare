var fs = require('fs');
var dir = require('node-dir');
//var Promise = require('promise');
var Promise = require('bluebird');
var url = require('url');
//var ini = require('ini');


module.exports = function(app, fs)
{
    function listFiles(path, items){
        return new Promise(function (fulfill, reject){
            fs.readdir(path, function(err, items) {
                if (err) reject(err);
                else fulfill(items);
            });
        });
    }

    function isDirectory(path, isFile){
        return new Promise(function(fulfill, reject){
            fs.stat(path, function(err, stats) {
                isFile=stats.isDirectory();
                if (err) reject(err);
                else fulfill(isFile);
            });
        });
    }
    
    function serveFile(path, isSucceed){
        return new Promise(function(fulfill, reject){

                if (err) reject(err);
                else fulfill(isFile);
        });
    }

    var callback;
    app.get('/',function(req,res){
        var path = './';
        listFiles(path).then(function(items){
            return res.render('index', {
                    title: "MangoShare",
                    item: items,
                })
        });
    });
    app.get('/files/', function(req,res){
        var path = './';
        listFiles(path).then(function(items){
            return res.render('index', {
                    title: "MangoShare",
                    item: items,
                })
        });
    });

    app.get('/files/*',function(req,res){
        // /files/first/second/... -> need to split '/files/'
        var url = req.url.substr(7)
        var path = './'+url;
        isDirectory(path).then(function(isDir){
            if (isDir === false){
                serveFile()
            } else {
                listFiles(path).then(function(items){
                    return res.render('index', {
                            title: "MangoShare",
                            item: items,
                        })
                });
            }
        });
    });

    app.get('/settings', function(req,res){
        res.render('settings', {
        })
    });
}
