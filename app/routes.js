var User = require('./models/user');
var Category = require('./models/category');
var News = require('./models/news');
var md5 = require('js-md5');

function checkTokenValidation(req, cb) {
    if (!req.headers.token) {
        cb(500, 500);
    } else {
        User.findOne({
            token: req.headers.token
        }, function (err, user) {
            if (err)
                cb(500, 500);
            if (!user) {
                cb(500, 500);
            } else {
                cb(200, user);
            }
        });
    }
}

module.exports = function (router, config, jwt) {
    router.get('/', function (req, res) {
        res.json({message: 'hooray! welcome to our api!'});
    });

    router.route('/signup').post(function (req, res) {
        if (!req.body.username || !req.body.password || !req.body.name) {
            return res.json({success: false, msg: 'Please pass username and password.'});
        } else {
            var newUser = new User({
                username: req.body.username,
                password: req.body.password,
                name: req.body.name
            });
            // save the user
            newUser.save(function (err) {
                if (err) {
                    return res.json({success: false, msg: 'Username already exists.'});
                }
                return res.json({success: true, msg: 'Successful created new user.'});
            });
        }
    })

    router.route('/login').post(function (req, res) {
        if (!req.body.username || !req.body.password) {
            return res.json({success: false, msg: 'Please pass username and password.'});
        } else {
            var newUser = new User({
                username: req.body.username,
                password: req.body.password
            });

            var encrpted_pswd = md5(req.body.password);
            User.findOne({
                username: req.body.username,
                password: encrpted_pswd
            }, function (err, user) {
                if (err)
                    return res.json({success: false, msg: 'Authentication failed. Wrong password.'});
                if (!user) {
                    return res.send({success: false, msg: 'Authentication failed. User not found.'});
                } else {
                    var token = jwt.sign(user, config.secret);
                    user.token = token;
                    user.save(function (err) {
                        if (err) {
                            return res.json({success: false, msg: 'Authentication failed. Wrong password.'});
                        }
                        return res.json({success: true, token: token});
                    });
                }
            });
        }
    })

    router.route('/profile').post(function (req, res) {

        checkTokenValidation(req, function (status, user) {
            if (status == 200) {
                console.log(req.body.name);
                if (typeof req.body.name != 'undefined') {
                    user.name = req.body.name;
                }
                user.save(function (err) {
                    if (err) {
                        return res.json({success: false, msg: 'Error occured. Please try again after sometime.'});
                    }
                    return res.json({success: true, msg: 'Profile has been updated.'});
                });
            } else {
                return res.json({success: false, msg: 'Failed to authenticate token.'});
            }
        });
        return;
    })

    router.route('/categories')
            // get all the category for login user
            .get(function (req, res) {
                checkTokenValidation(req, function (status, user) {
                    if (status == 200) {
                        Category.find(function (err, employees) {
                            if (err)
                                res.send(err);
                            return res.json({success: true, msg: "Category list.", data: employees});
                        });
                    } else {
                        return res.json({success: false, msg: 'Failed to authenticate token.'});
                    }
                });
            });

    router.route('/news/:category_id/:news_id')
            // get all the category for login user
            .get(function (req, res) {
                var category_id = req.params.category_id;
                checkTokenValidation(req, function (status, user) {
                    if (status == 200) {
                        News.find(function (err, news) {
                            if (err)
                                res.send(err);
                            return res.json({success: true, msg: "News list.", data: news});
                        });
                    } else {
                        return res.json({success: false, msg: 'Failed to authenticate token.'});
                    }
                });
            })
            .post(function (req, res) {
                var category_id = req.params.category_id;
                if (!req.body.title || !req.body.short_desc || !req.body.description) {
                    return res.json({success: false, msg: 'Please enter title,Short description and Description.'});
                } else {
                    checkTokenValidation(req, function (status, user) {

                        if (status == 200) {
                            if (user.role_id == 1) {
                                var news = new News();
                                var now = new Date();

                                news.category_id = category_id;
                                news.title = req.body.title;
                                news.short_desc = req.body.short_desc;
                                news.description = req.body.description;
                                news.created = now;
                                if (typeof req.body.tags != 'undefined') {
                                    news.tags = req.body.tags;
                                }
                                news.save(function (err) {
                                    if (err)
                                        res.send(err);

                                    res.json({success: true, msg: 'News created!'});
                                });
                            } else {
                                return res.json({success: false, msg: 'You are not valid user.'});
                            }
                        } else {
                            return res.json({success: false, msg: 'Failed to authenticate token.'});
                        }
                    });
                }
            })
            //Edit News details by id
            .put(function (req, res) {
                checkTokenValidation(req, function (status, user) {
                    if (status == 200) {
                        if (user.role_id == 1) {
                            News.findById(req.params.news_id, function (err, news) {
                                if (err)
                                    return res.json({success: false, msg: 'News details not available.'});

                                if (typeof req.body.title != 'undefined') {
                                    news.title = req.body.title;
                                }
                                if (typeof req.body.short_desc != 'undefined') {
                                    news.short_desc = req.body.short_desc;
                                }
                                if (typeof req.body.description != 'undefined') {
                                    news.description = req.body.description;
                                }
                                if (typeof req.body.tags != 'undefined') {
                                    news.tags = req.body.tags;
                                }
                                news.save(function (err) {
                                    if (err)
                                        res.send(err);
                                    res.json({success: true, msg: 'News updated!'});
                                });
                            });
                        } else {
                            return res.json({success: false, msg: 'You are not valid user.'});
                        }
                    } else {
                        return res.json({success: false, msg: 'Failed to authenticate token.'});
                    }
                });
            })
            //Remove News details by id
            .delete(function (req, res) {
                checkTokenValidation(req, function (status, user) {
                    if (status == 200) {
                        if (user.role_id == 1) {
                            News.remove({
                                _id: req.params.news_id
                            }, function (err, news) {
                                if (err)
                                    res.send(err);
                                res.json({success: true, msg: 'Successfully deleted'});
                            });
                        } else {
                            return res.json({success: false, msg: 'You are not valid user.'});
                        }
                    } else {
                        return res.json({success: false, msg: 'Failed to authenticate token.'});
                    }
                });
            });

    router.route('/search/:term')
            // get all the category for login user
            .get(function (req, res) {
                var term = req.params.term;
                checkTokenValidation(req, function (status, user) {
                    if (status == 200) {
                        News.find(
                                {
                                    $or: [
                                        {"title": {$regex: term}},
                                        {"short_desc": {$regex: term}},
                                        {"description": {$regex: term}},
                                        {"tags": {$regex: term}}
                                    ]
                                }, function (err, news) {
                            if (err)
                                res.send(err);
                            return res.json({success: true, msg: "Search result for '" + term + "'.", data: news});
                        });
                    } else {
                        return res.json({success: false, msg: 'Failed to authenticate token.'});
                    }
                });
            })
};

