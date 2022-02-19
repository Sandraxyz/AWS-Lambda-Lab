exports.handler = function(event, context, callback){ 
    var
        AWS = require("aws-sdk"),
        DDB = new AWS.DynamoDB({
            apiVersion: "2012-08-10",
            region: "us-east-1"
        });

    function queryIndex(breed_str, cb){
        var
            params = {
                ExpressionAttributeValues: {
                    ":breed": {
                        S: breed_str
                    }
                },
                KeyConditionExpression: "breed = :breed",
                TableName: "lostcats",
                IndexName: "breed_index"
            };
        DDB.query(params, function(err, data){
            var
                cat_reply_arr = [];
                if(err){
                    throw err;
                }
                if(data.Items.length === 0){
                    throw "You passed in a breed we don't have";
                }
                for(var i_int = 0; i_int < data.Items.length; i_int += 1){
                    cat_reply_arr.push(data.Items[i_int]);
                }
                cb(null, cata_reply_arr);
        });
    }

    function  scanTable(cb){
        var 
            params = {
                TableName: "lostcats"
            };
        DDB.scan(params, function(err, data){
            if(err){
                throw err;
            }
            cb(null, data.ITems);
        });
    }

    (function init(){
        var
            breed_str = "all",
            cb = null;
        if(process.argv[2] !== undefined){
            console.log("local test for " + process.argv[2]);
            breed_str = process.agv[2];
            cb = console.log;
        } else {
            console.log("Running in Lambda");
            console.log(event);
            cb = callback; //becomes available in Lambda
            breed_str = event.breed_str;
        }
        if(breed_str === "All"){
            scanTable(cb);
        }else{
            queryIndex(breed_str, cb); 
        }
    })();
}    
