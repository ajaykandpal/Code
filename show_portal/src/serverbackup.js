const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = 3001;
const routes = express.Router();
var AWS = require("aws-sdk");
const User = require('./User.js');
var ps = require('python-shell');
var configa=require('./s3/aws_config.js');
const fileType = require('file-type');
var path = require('path');
var multer = require('multer')
app.use(cors())
app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/policy', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})


routes.route('/dob').post((req,res) => {

User.findOne({p_no: req.body.p_no}, function(err, user){
        if(err) {
          console.log(err);
        }
        
        if(user) {
           
          
            res.status(200).send("Successful");

        }
        
        else {
            
               res.send("Invalid Credentials!");
        }
        });
      

})



routes.route('/mobile').post((req,res) => {

User.find({m_no: req.body.m_no}, function(err, user){
        if(err) {
          console.log(err);
        }
        
        if(user) {
           
          
            res.status(200).send("Successful");

        }
        
        else {
            
               res.send("Invalid Credentials!");
        }
        });
      

})






routes.route('/PolicyList').post((req, res) => {
    User.findOne({p_no:req.body.p_no}, function (err, data) {
        if (!data)
            res.status(404).send('data is not found');
        else
        {
   
        	res.json(data);		
            
}
  })
  })
  

  routes.route('/PolicyList/docs').post((req, res) => {
   
   console.log("checking node response",req.body);
  var name ;
    var typefile;
    var bodyfile;
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, 'public')
    },

    filename: function (req, file, cb) {
    name = file.originalname;
    typefile = path.extname(name);
    typefile= typefile.substr(1);
    typefile='image/'+typefile;
    console.log(typefile);
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
      
  User.findOneAndUpdate({p_no: req.body.p_no}

, {$set: {aadhar: "G:/maxx2/myapp/src/public/"+name}}

, function (err, doc) {

    if (err) {

        console.log("update document error");

    } else {

        console.log("update document success");
         console.log(doc);

    }
})




 var command = 'public/'+name;
var options = {
  scriptPath: './',
  args: [command], 
};
ps.PythonShell.run('table.py', options, function (err, results) {
  if (err) throw err;
 // console.log('results: %j', results);
});


    return res.status(200).send(req.file)

})

})



   routes.route('/PolicyList/docs2').post((req, res) => {
   
   console.log("checking node response",req.body);
   var name;
  
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, 'public')
    },

    filename: function (req, file, cb) {
    name = file.originalname;
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
      
  User.findOneAndUpdate({p_no: req.body.p_no}

, {$set:{pan: "G:/maxx2/myapp/src/public/"+name}}

, function (err, doc) {

    if (err) {

        console.log("update document error");

    } else {

        console.log("update document success");


        console.log(doc);

    }
})
    return res.status(200).send(req.file)

})

})
app.use('/todos', routes);


app.listen(PORT, () => {
    console.log("Listening...");
});


app.listen(8001, function() {

    console.log('App running on port 8000');

});