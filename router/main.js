var fs = require('fs');
var dir = require('node-dir');
var Promise = require('bluebird');
var url = require('url');
var send = require('send');
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
            try{
                removeSlashPath=path.substring(0,path.length-1);
                var stat = fs.statSync(removeSlashPath);
            } catch (err){
                if (err.code === 'ENOTDIR') {
                    isFile=false;
                    fulfill(isFile);
                } else {
                    reject(err)
                }
            }
            if (stat.isFile()){
                isFile=true;
                fulfill(isFile);
            } else{
                isFile=false;
                fulfill(isFile);
            }

        });
    }
    
    function serveFile(path, req, res, isSucceed){
        return new Promise(function(fulfill, reject){
            console.log(path);
            removeSlashPath=path.substring(0,path.length-1);
            send(req, removeSlashPath, function(err){
                if (err) reject(err);
                else fulfill(isFile);
            }).pipe(res);
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
        var url = req.url.substr(7);
        var path = './'+url;
        var isSucceed;
        console.log(path);
        isDirectory(path).then(function(isFile){
            if (isFile === true){
                serveFile(path, req, res, isSucceed);
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
