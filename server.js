'use strict';

// add modules
const express = require('express');
const multer = require('multer');
const imageresize = require('./modules/imageresize');
const coordinates = require('./modules/coordinates');
const jsonfile = require('jsonfile');
const mongoose = require('mongoose');
const upload = multer({dest: 'public/uploads/'});


// init app
const app = express();

// connect to database, start app.listen
mongoose.connect('mongodb://sssfa:sssfpass@localhost:27017/cats')
.then(() => {
  console.log('Connected successfully.');
  app.listen(3000);
}, err => {
  console.log('Connection to db failed: ' + err);
});

// set upload folder

// serve static files
app.use(express.static('public'));

// serve node_modules
app.use('/modules', express.static('node_modules'));


const CatSchema =new mongoose.Schema({
    time: {
      type: Date,
      default: Date.now
    },
    category: String,
    title: String,
    details: String,
    coordinates: {
      lat: Number,
      lng: Number
    },
    thumbnail: String,
    image: String,
    original: String
  });
  
  const Cat = mongoose.model('Cat', CatSchema);
// add new image


app.post('/post', upload.single('file'), function(req, res, next) {
 

  req.body.original = 'original/' + req.file.filename;
  next();
});

app.use('/post', (req, res, next) => {
  const coords = JSON.parse(req.body.coordinates);
  const lat =coords.lat;
  const lng = coords.lng;
  req.body.coordinates = {
    lat : lat,
    lng :lng
  }
  console.log(req.body.coordinates);
    next();
});

// make small thumbnail
app.use('/post', (req, res, next) => {
  const thumbPath = 'thumbs/' + req.file.filename;
  imageresize.resize(req.file.path, 'public/' + thumbPath, 320, 240).
      then(resp => {
        //console.log(resp);
        req.body.thumbnail = thumbPath;
        next();
      });
});



// make medium thumbnail
app.use('/post', (req, res, next) => {
  const medPath = 'img/' + req.file.filename;
  imageresize.resize(req.file.path, 'public/' + medPath, 770, 720).
      then(resp => {
        //console.log(resp);
        req.body.image = medPath;
        next();
      });

});



// save data to database
app.use('/post', (req, res, next) => {
 Cat.create(req.body).then(post => {
    res.send(post);
  });
});

app.get('/all', (req, res) => {
  Cat.find().then(cats => {
    res.send(cats);
  });
});