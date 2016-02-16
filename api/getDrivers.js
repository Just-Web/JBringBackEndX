
/*
function executeStatement() {
    var request = new Request("INSERT INTO Delivery (WebshopID, deliverySession, dropOffAddress, dropOffLat, dropOffLon) OUTPUT INSERTED.id VALUES (@WebshopID, @deliverySession, @dropOffAddress, @dropOffLat, @dropOffLon);", function(err) {
     if (err) {
        console.log(err);}
    });
    request.addParameter('WebshopID', TYPES.NVarChar,'SQL Server Express 2014');
    request.addParameter('deliverySession', TYPES.NVarChar , 'SQLEXPRESS2014');
    request.addParameter('dropOffAddress', TYPES.NVarChar , 'Kostas House');
    request.addParameter('dropOffLat', TYPES.Int,11);
    request.addParameter('dropOffLon', TYPES.Int,11);
    request.on('row', function(columns) {
        columns.forEach(function(column) {
          if (column.value === null) {
            console.log('NULL');
          } else {
            console.log("Product id of inserted item is " + column.value);
          }
        });
    });     
    connection.execSql(request);
}
*/


//LAST CODE USED THIS NIGHT 1:00 AM 8 FEBRUARY
/*
#########################################
#########################################
#########################################
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

var config = {
     userName: 'kostas',
     password: 'nM78Pj5K',
     server: 'jbringtest.database.windows.net',
    
     // If you're on Windows Azure, you will need this:
     options: { encrypt: true, database: 'JBringTest' }
};

var connection = new Connection(config);
connection.on('connect', function(err) {
            // If no error, then good to proceed.
            console.log("Connected");
            executeStatement1();     
        });

module.exports = {
    get: function (req, resp) {
        resp.json("ok");
    }
};


function executeStatement1() {
    var request = new Request("INSERT INTO Delivery (WebshopID, deliverySession, dropOffAddress) OUTPUT INSERTED.id VALUES (@WebshopID, @deliverySession, @dropOffAddress);", function(err) {
            if (err) {
                console.log(err);}
             });
            request.addParameter('WebshopID', TYPES.NVarChar,'SQL Server Express 2014');
            request.addParameter('deliverySession', TYPES.NVarChar , 'SQLEXPRESS2014');
            request.addParameter('dropOffAddress', TYPES.NVarChar , 'Tullinsgade 7, 1618 København V, Denmark');
            
            request.on('row', function(columns) {
                columns.forEach(function(column) {
                    if (column.value === null) {
                        console.log('NULL');
                    } else {
                        console.log("Product id of inserted item is " + column.value);
                    }
                });
            });
        connection.execSql(request);
}
#########################################
#########################################
#########################################
*/
/*
var modules = require("./node_modules");

module.exports = {
    "get": function (request, response) {
        //var sql = request.service.mssql;
        modules.mssql.queryRaw('select top 3 * from Driver', {
        success: function(results) {
            console.log(results);
        },
        error: function(err) {
            console.log("error is: " + err);
        }
    });
        
    }
};*/

//##########################################################################################
//##########################################################################################
//##########################################################################################
//##########################################################################################
//##########################################################################################
//##########################################################################################
//##########################################################################################
//###################################WORKING MSSQL METHOD###################################
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
    "get" : function (request, response) {
        sql.connect(config).then(function() {
        // Query

            new sql.Request().query('select * from Driver').then(function(recordset) {
                // console.log(recordset);
                console.log(recordset[0].id);
                
                response.json(recordset);
            }).catch(function(err) {
                // ... query error checks
                console.log(err);
            });

    
        }).catch(function(err) {
            // ... connect error checks
            console.log(err);
        });
        
    }
};
//##########################################################################################
//##########################################################################################
//##########################################################################################
//##########################################################################################
//##########################################################################################
//##########################################################################################
//######################################ENDS HERE###########################################


/* 
var azure = require('azure-storage');
//var tables = require("tables");
module.exports = {
    "get": function (request, response) {
        var drivers = tables.getTable('Driver');
        console.log(drivers);
    }
};
*/   

//var connection = new mssql.
/*
var connection = new mssql.Connection(this.settings, function (err) {
            callback(err);
        });

var request = new mssql.Request(connection);
module.exports = {
    "get": function (request, response) {
        
        mssql.queryRaw('select * from Driver', {
        success: function(results) {
            console.log(results);
        },
        error: function(err) {
            console.log("error is: " + err);
        }
    });
        
    }
};
*/


/*
module.exports = {
    "get": function (request, response) {
        var mssql = request.service.mssql;
        mssql.open({
            success: function(connection) {
                connection.query('select top 3 * from Driver', {
                    success: function(results) {
                        console.log(results);
                    },
                    error: function(err) {
                        console.log("error is: " + err);
                    }
                });
            },
            error: function(err) {
                console.log("error is: " + err);
            }
        });
     
    }
};
*/

