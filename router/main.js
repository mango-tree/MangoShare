var fs = require('fs');
var dir = require('node-dir');
//var Promise = require('promise');
var Promise = require('bluebird');
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

        fs.readdir(path, function(err, items) {
            console.log(items);

            for (var i=0; i<items.length; i++) {
                console.log(items[i]);
            }
        });
    }

    var callback;
    app.get('/',function(req,res){
        var path = './';
        var items;
        Promise.promisifyAll(listFiles);
        fs.readdir(path, function(err, items) {
            res.render('index', {
                title: "MangoShare",
                item: items,
                length: 100
            })
        });
    });

    app.get('/settings', function(req,res){
        res.render('settings', {
        })
    });
}
