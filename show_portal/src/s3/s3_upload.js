$( document ).ready(function() {
$("#uploadForm").submit(function() {
var bucket = new AWS.S3({params: {Bucket: 'sarikas3'}});
var uploadFiles = $('#upFile')[0];
var upFile = uploadFiles.files[0];
if (upFile) {
var uploadParams = {Key: upFile.name, ContentType: upFile.type, Body: upFile};
bucket.upload(uploadParams).on('httpUploadProgress', function(evt) {
}).send(function(err, data) {
$('#upFile').val(null);
$("#showMessage").show();
});
}
return false;
});
});