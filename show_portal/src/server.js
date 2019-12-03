const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = 3001;
const routes = express.Router();
var AWS = require("aws-sdk");
var ps = require('python-shell');
var config=require('./s3/aws_config.js');
const fileType = require('file-type');
var path = require('path');
var multer = require('multer')
app.use(cors())
app.use(bodyParser.json());


//AWS SDK for DynamoDb-Node.js
AWS.config.update({region: 'ap-south-1'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});



//1.Upload Page (check credentials)
// routes.route('/login').post((req,res) => {
// var params = {
//   TableName: 'Users',
//   Key: {
//     'p_no': {S: req.body.p_no}
//   },
//   ProjectionExpression: 'p_no'
// };
// ddb.getItem(params, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.Item);
//     if(typeof data.Item!=="undefined") 
//         {
//           res.status(200).send("Successful");
//         }
//         else 
//         {
//           res.send("Invalid Credentials!");
//         }
//   }
// });  
// })




//2.Policy_List_Page to upload the documents
// routes.route('/PolicyList').post((req, res) => {
//   var params = {
//   TableName: 'Users',
//   Key: {
//     'p_no': {S: req.body.p_no}
//   },
//   ProjectionExpression: 'p_no'
// };
// ddb.getItem(params, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     if(typeof data.Item!=="undefined") 
//         {
//           res.json(data.Item);
//         }
//         else 
//         {
//           res.status(404).send('data is not found');
//         }
//   }
// });
//   })


//3.uploaded or left
// routes.route('/PolicyList/check').post((req, res) => {

//  let array=[];
//       for(var i=0;i<req.body.l.length;i++)
//       {
//           let results=req.body.loc.split(',');
//           array.push("Left");
//           for(var j=0;j<results.length;j++)
//             {
//                if(req.body.l[i]==results[j])
//                   {
//                     array.pop();
//                     array.push("Done");
//                     flag=1;
//                     break;
//                   }
//             }
//             if(i==(req.body.l.length-1))
//             {
               
//                return res.send(array);

//             }
//       }
     
//       });
      




 
 //4.Upload Documents
 routes.route('/PolicyList/docs1').post((req, res) => {
    var name;
    let name1;
    var bodyfile;
    // console.log("AA rha h bc!!!");
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
       let words = file.originalname.split('.');
       name1= file.originalname
       ;
      cb(null, 'Input')
    },
    filename: function (req, file, cb) {
    name = name1;
    bodyfile=file;
      cb(null,name)
    }
})
var upload = multer({ storage: storage }).single('file')        		
            upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }      



var command1 = "Input/"+bodyfile.originalname;
// var command3=req.body.nmm;
var options = {
  scriptPath: './',
  args: [command1], 
};
ps.PythonShell.run('rot_up.py', options, function (err, results) {
  if (err) throw err;
});
    return res.status(200).send(req.file)
})
})




//5.Submit  Docs to SQS
// routes.route('/PolicyList/docs2').post((req, res) => {
// var command1 = req.body.p_no;
// var command2 = req.body.lists;
// var options = {
//   scriptPath: './',
//   args: [command1,command2], 
// };
// ps.PythonShell.run('Python_Scripts/send_sqs.py', options, function (err, results) {
//   if (err) throw err;
//  // console.log('results: %j', results);
// });
// })


//Middleware used
app.use('/todos', routes);
app.listen(PORT, () => {
    console.log("Listening...");
});
app.listen(8001, function() {
    console.log('App running on port 8001');
});