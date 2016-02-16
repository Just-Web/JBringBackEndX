//##############################################################
//##############################################################
//##############################################################
//##############################################################

// Return a list of deliveries working but needs integration with mobile
//TODO Create TDOs on the mobile to get the list. (List<Delivery>)
//##############################################################

var sql = require('mssql');

var config = {
    user: 'kostas',
    password: 'nM78Pj5K',
    server: 'jbringtest.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'JBringTest',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};


module.exports = {
    "post": function (request, response) {
        var locations = [];
        locations[locations.length] = {
            'address': "55.6528404" + "," + "12.5044584",
            'lat': 55.6528404,
            'lng': 12.5044584
        };
        var orderedListOfDeliveries = { "deliveries": [] };
        sql.connect(config).then(function () {
            // Query

            new sql.Request().query('select * from Delivery').then(function (recordset) {
                // console.log(recordset);
                // console.log(recordset);
                recordset.forEach(function (delivery) {
                    locations[locations.length] = {
                        'address': delivery.id,
                        'lat': delivery.dropOffLat,
                        'lng': delivery.dropOffLon,
                    };
                });
                console.log(locations);
                var httpRequest = require('request');
                httpRequest.post({
                    url: "https://api.routexl.nl/tour",
                    dataType: "json",
                    headers: {
                        "Authorization": "Basic " + Buffer("seichis:k2178600", "ascii").toString('base64')
                    },
                    body: "locations=" + JSON.stringify(locations),

                }, function (err, res, body) {
                        if (err) {
                            console.log(err);
                        } else {
                            var tmp = body;
                            console.log(tmp);
                            try {
                                tmp = JSON.parse(body);
                                body = tmp;
                            }
                            catch (err) {
                                console.log(err);
                            }

                            var bodyArr = [];

                            // console.log(body);

                            var routes = body.route;
                            for (var x in routes) {
                                bodyArr.push(routes[x]);
                            }
                            console.log(bodyArr);

                            bodyArr.forEach(function (delivery) {
                                var found = false;
                                recordset = recordset.filter(function (item) {
                                    if (!found && item.id == delivery["name"]) {
                                        orderedListOfDeliveries["deliveries"].push(item);
                                        found = true;
                                        return false;
                                    } else
                                        return true;
                                });
                            });
                        }
                        // console.log(JSON.stringify(orderedListOfDeliveries));
                        console.log(orderedListOfDeliveries);

                        response.json(orderedListOfDeliveries);
                    });

            }).catch(function (err) {
                // ... query error checks
                console.log(err);
            });


        }).catch(function (err) {
            // ... connect error checks
            console.log(err);
        });

    }
};

