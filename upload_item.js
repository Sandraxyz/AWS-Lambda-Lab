const { inherits } = require("util");

var
    AWS = require("aws-sdk"),
    S3API = new AWS.S3({
        apiVersion: "2006-03-01",
        region: "us-east-1"
    });
    FS = require("fs"), 
    bucket_name_str = "c37961a486840l1318962t1w354528800387-s3bucket-jchy7qop6iac";

function uploadItemAsBinary(key_name_str, content_type_str, bin){
    var params = {
        Bucket: bucket_name_str, 
        Key: key_name_str, 
        Body: bin, 
        ContentType: content_type_str, 
        CacheControl: "max-age-0"
    };
    S3API.putObject(params, function(error, data){
        console.log(error, data);
    });
}

(function init(){
    var 
        file_path_str = "./",
        file_name_str = "website_api_code.zip",
        config_bin = FS.readFileSync(file_path_str + file_name_str);
    uploadItemAsBinary(file_name_str, "application/zip", config_bin);
})();