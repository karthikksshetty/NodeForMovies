/**
 * Created by Karthik KS on 06-07-2017.
 */
// API ROUTES -------------------

// get an instance of the router for api routes


// route to authenticate a user (POST http://localhost:8080/api/authenticate)

// route middleware to verify a token
module.exports.verifyToken = function(req, res, next,homePage) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        /*return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });*/
        return res.sendFile(homePage);

    }
};

// route to show a random message (GET http://localhost:8080/api/)

// route to return all users (GET http://localhost:8080/api/users)

// apply the routes to our application with the prefix /api
