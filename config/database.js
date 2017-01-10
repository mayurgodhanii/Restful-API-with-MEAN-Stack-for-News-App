var User = require('../app/models/user');
var Category = require('../app/models/category');

module.exports = {
    'secret': 'OtCv0JM9aw61m93l5iIns8uM8Qe4Lp5l',
    'database': 'mongodb://localhost/mean-rest-auth'
};

var MongoClient = require('mongodb').MongoClient
        , assert = require('assert');

// Connection URL 
var url = module.exports.database;
// Use connect method to connect to the Server 
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    var collection = db.collection('users');
    collection.find({role_id: 1}).toArray(function (err, adminusers) {
        if (adminusers.length) {
            console.log("Admin available.");
        } else {
            console.log("Admin not available.");
            var user = new User();
            user.role_id = 1;
            user.username = "admin@admin.com";
            user.password = "21232f297a57a5a743894a0e4a801fc3"; //admin
            user.name = "Admin User";
            user.token = "mayur";
            user.save(function (err) {
                if (err)
                    res.send(err);
                console.log("Admin created");
            });
        }
    });
    var collection = db.collection('categories');

    collection.find().toArray(function (err, categories) {
        if (categories.length) {
            console.log("categories available.");
        } else {
            var category = new Category();
            category.name = "Politics";
            category.save(function (err) {
                if (err)
                    res.send(err);
            });

            var category = new Category();
            category.name = "Entertainment";
            category.save(function (err) {
                if (err)
                    res.send(err);
            });

            var category = new Category();
            category.name = "Sports";
            category.save(function (err) {
                if (err)
                    res.send(err);
            });

            var category = new Category();
            category.name = "India";
            category.save(function (err) {
                if (err)
                    res.send(err);
            });

            var category = new Category();
            category.name = "World";
            category.save(function (err) {
                if (err)
                    res.send(err);
            });

            var category = new Category();
            category.name = "Others";
            category.save(function (err) {
                if (err)
                    res.send(err);
            });

            console.log("Categories Created.");
        }
    });

    db.close();
});