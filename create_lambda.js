var
    AWS = require("aws-sdk"),
    LAMBDA = new AWS.lambda({
        apiVersion: "2015-03-31",
        region: "us-east-1"
    });

function createLambdaFromZip(){
    var
        params = {
            Code: {
                S3Bucket: "c37961a486840l1318962t1w354528800387-s3bucket-jchy7qop6iac",
                S3Key: "webiste_api_code.zip"
            },
            Description: "Amazing cat website",
            FunctionName: "CatSearch",
            Handler: "query_cats.handler",
            MemorySize: 128,
            Publish : true,
            Role: "arn:aws:iam::354528800387:role/cat-search-role-for-lambda",
            Runtime: "nodejs14.x",
            Timeout: 30,
        };
        LAMBDA.createFunction(params, function(err, data){
            console.log(err, data);
        });
}
(function init(){
    createLambdaFromZip();
})();



