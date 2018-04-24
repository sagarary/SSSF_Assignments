'use strict';

// add modules
const express = require('express');
const multer = require('multer');
const imageresize = require('./modules/imageresize');
const jsonfile = require('jsonfile');
const mongoose = require('mongoose');
const moment = require('moment');
const upload = multer({ dest: 'public/uploads/' });
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const https = require('https');
require('dotenv').config();
const passport= require('passport');
const LocalStrategy = require('passport-local').Strategy;
const helmet = require('helmet');

const app = express();
app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet({
  ieNoOpen: false
}));


// init app
const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem');
const options = {
  key: sslkey,
  cert: sslcert
}

// connect to database, start app.listen
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
  .then(() => {
    console.log('Connected successfully.');
    https.createServer(options, app).listen(3300);
  }, err => {
    console.log('Connection to db failed: ' + err);
  });


app.use(passport.initialize());

// set upload folder

// serve static files
//app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve node_modules
app.use('/modules', express.static('node_modules'));




const CatSchema = new mongoose.Schema({
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
// start form processing
// add new image

/**
 * @api {post} /post Add a new cat
 * @apiDescription Add a new entry to cats database
 * @apiGroup Cats
 * @apiParam {String} title Cat Title
 * @apiParam {String} category Cat Category
 * @apiParam {String} details Cat Details
 * @apiParam {Object} coordinates Cat Coordinates
 * @apiParam {String} thumbnail Cat Thumbnail Uri
 * @apiParam {String} image Cat Mid size image Uri
 * @apiParam {String} original Cat Original image Uri
 * @apiParamExample {json} new Cat
 * {
 * "title" : "Title",
 * "category" : "Category,"
 * "details" : "a quick brown fox jumps over a lazy dog",
 * "coordinates" : {
 * "lat": 77.77,
 * "lng": 77.77
 *  },
 * "thumbnail" : "thumbnail/1e1a91fff026a7d0402ebe52f9c56b90"
 * "image" : "image/1e1a91fff026a7d0402ebe52f9c56b90"
 * "original" :"original.1e1a91fff026a7d0402ebe52f9c56b90"
 * }
 * @apiSuccess {Number} _id Cat _id
 * @apiSuccess {Date} date Cat date
 * @apiSuccess {String} title Cat Title
 * @apiSuccess {String} category Cat Category
 * @apiSuccess {String} details Cat Details
 * @apiSuccess {Object} coordinates Cat Coordinates
 * @apiSuccess {String} thumbnail Cat Thumbnail Uri
 * @apiSuccess {String} image Cat Mid size image Uri
 * @apiSuccess {String} original Cat Original image Uri
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 * "time" : 
 * "title" : "Title",
 * "category" : "Category,"
 * "details" : "a quick brown fox jumps over a lazy dog",
 * "coordinates" : {
 * "lat": 77.77,
 * "lng": 77.77
 *  },
 * "thumbnail" : "thumbnail/1e1a91fff026a7d0402ebe52f9c56b90"
 * "image" : "image/1e1a91fff026a7d0402ebe52f9c56b90"
 * "original" :"original.1e1a91fff026a7d0402ebe52f9c56b90"
 * }
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 */

app.post('/post', upload.single('file'), function (req, res, next) {

  req.body.original = 'uploads/' + req.file.filename;
  next();
});

app.use('/post', (req, res, next) => {
  const coords = JSON.parse(req.body.coordinates);
  const lat = coords.lat;
  const lng = coords.lng;
  req.body.coordinates = {
    lat: lat,
    lng: lng
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
  Cat.create(req.body).then((err, post) => {
   if (err) return res.status(500).send(err); 
    return res.send(post);
  });
});


//get all data 
/**
 * @api {get} /all Get all cats
 * @apiDescription Get all entries from cats database
 * @apiGroup Cats
 * @apiSuccess {Number} _id Cat _id
 * @apiSuccess {Date} date Cat date
 * @apiSuccess {String} category Cat Category
 * @apiSuccess {String} details Cat Details
 * @apiSuccess {Object} coordinates Cat Coordinates
 * @apiSuccess {String} thumbnail Cat Thumbnail Uri
 * @apiSuccess {String} image Cat Mid size image Uri
 * @apiSuccess {String} original Cat Original image Uri
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 * "time" : 
 * "title" : "Title",
 * "category" : "Category,"
 * "details" : "a quick brown fox jumps over a lazy dog",
 * "coordinates" : {
 * "lat": 77.77,
 * "lng": 77.77
 *  },
 * "thumbnail" : "thumbnail/1e1a91fff026a7d0402ebe52f9c56b90"
 * "image" : "image/1e1a91fff026a7d0402ebe52f9c56b90"
 * "original" :"original.1e1a91fff026a7d0402ebe52f9c56b90"
 * }
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 */
app.get('/all', (req, res) => {
  Cat.find().then((err,cats) => {
    if (err) return res.status(500).send(err);
    res.send(cats);
  });
});

//update 

/**
 * @api {put} /update/:id Update a Cat
 * @apiGroup Cats
 * @apiDescription Update an entry of the cats database
 * @apiParam {id} id Cat id
 * @apiGroup Cats
 * @apiParam {String} title Cat Title
 * @apiParam {String} category Cat Category
 * @apiParam {String} details Cat Details
 * @apiParam {Object} coordinates Cat Coordinates
 * @apiParam {String} thumbnail Cat Thumbnail Uri
 * @apiParam {String} image Cat Mid size image Uri
 * @apiParam {String} original Cat Original image Uri
 * @apiParamExample {json} new Cat
 * {
 * "title" : "Title",
 * "category" : "Category,"
 * "details" : "a quick brown fox jumps over a lazy dog",
 * "coordinates" : {
 * "lat": 77.77,
 * "lng": 77.77
 *  },
 * "thumbnail" : "thumbnail/1e1a91fff026a7d0402ebe52f9c56b90"
 * "image" : "image/1e1a91fff026a7d0402ebe52f9c56b90"
 * "original" :"original.1e1a91fff026a7d0402ebe52f9c56b90"
 * }
 * @apiSuccess {Number} _id Cat _id
 * @apiSuccess {Date} date Cat date
 * @apiSuccess {String} title Cat Title
 * @apiSuccess {String} category Cat Category
 * @apiSuccess {String} details Cat Details
 * @apiSuccess {Object} coordinates Cat Coordinates
 * @apiSuccess {String} thumbnail Cat Thumbnail Uri
 * @apiSuccess {String} image Cat Mid size image Uri
 * @apiSuccess {String} original Cat Original image Uri
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 * "time" : 
 * "title" : "Title",
 * "category" : "Category,"
 * "details" : "a quick brown fox jumps over a lazy dog",
 * "coordinates" : {
 * "lat": 77.77,
 * "lng": 77.77
 *  },
 * "thumbnail" : "thumbnail/1e1a91fff026a7d0402ebe52f9c56b90"
 * "image" : "image/1e1a91fff026a7d0402ebe52f9c56b90"
 * "original" :"original.1e1a91fff026a7d0402ebe52f9c56b90"
 * }
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 */
 

app.put('/update/:id', (req, res) => {
  Cat.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, cats) => {
    console.log(req.params.id);
    if (err) return res.send(err);
    res.send(cats);
  });
});

//delete

/**
 * @api {delete} /delete/:id Remove a cat
 * @apiDescription Delete an entry from cats database
 * @apiGroup Cats
 * @apiParam {_id} id Cat _id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *  {
 *  'message': 'Successfully deleted',
 *  'id' : 1
 * }
 * @apiErrorExample {json} Delete error
 *    HTTP/1.1 500 Internal Server Error
 */
app.delete('/delete/:id', (req, res) => {
  console.log(req.params.id);


  Cat.findOne({ '_id': req.params.id },
    (err, cats) => {
      if (err) return err;
      fs.unlink(path.join(__dirname, '/public', cats.original));
      fs.unlink(path.join(__dirname, '/public', cats.thumbnail));
      fs.unlink(path.join(__dirname, '/public', cats.image));

    }
  )

  Cat.findByIdAndRemove(req.params.id, (err, cats) => {
    const response = {
      message: 'Successfully deleted',
      id: cats.id
    };
    if (err) return res.status(500).send(err);
    res.send(response);
  })
})

//find by id
/**
 * @api {get} /find/:id Get cat by id
 * @apiDescription Find an entry from cats database
 * @apiGroup Cats
 * @apiParam {_id} _id Cat _id
 * @apiSuccess {Number} _id Cat _id
 * @apiSuccess {Date} date Cat date
 * @apiSuccess {String} category Cat Category
 * @apiSuccess {String} details Cat Details
 * @apiSuccess {Object} coordinates Cat Coordinates
 * @apiSuccess {String} thumbnail Cat Thumbnail Uri
 * @apiSuccess {String} image Cat Mid size image Uri
 * @apiSuccess {String} original Cat Original image Uri
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 * "time" : 
 * "title" : "Title",
 * "category" : "Category,"
 * "details" : "a quick brown fox jumps over a lazy dog",
 * "coordinates" : {
 * "lat": 77.77,
 * "lng": 77.77
 *  },
 * "thumbnail" : "thumbnail/1e1a91fff026a7d0402ebe52f9c56b90"
 * "image" : "image/1e1a91fff026a7d0402ebe52f9c56b90"
 * "original" :"original.1e1a91fff026a7d0402ebe52f9c56b90"
 * }
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 */
app.get('/find/:id', (req, res) => {
  console.log(req.params.id)
  Cat.findOne({ '_id': req.params.id },
    (err, cats) => {
      console.log(cats);
      if (err) return res.status(500).send(err);
      res.send(cats);
    }
  )
})

app.get('/error', (req,res) => {
  res.send('Error, Something went wrong');
})
 

//init passport
passport.use(new LocalStrategy(
  (username, password, done) => {
    console.log('here');
      if (username !== process.env.USER || password !== process.env.PASS) {
          done(null, false, {message: 'Incorrect credentials.'});
          return;
      }
      console.log('Auth');
      return done(null, {});
  } 
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.post('/login', 
passport.authenticate('local', {
  failureRedirect: '/error'}), 
  (req,res) => {
    res.redirect('/');
  }
)

app.get('/', (req,res) => {
  res.render('index');
})
app.get('/login', (req,res) => {
  res.render('login');
})
app.get('apidoc', (req,res) => {
  res.redirect('public/apidoc');
})