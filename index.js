const express = require('express');
// const expressLayouts = require('express-ejs-layouts');
const fetch = require('node-fetch')
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path')
const bodyParser = require('body-parser')
// Passport Config
require('./config/passport')(passport);

const User = require('./models/User');
const bcrypt = require('bcryptjs');
const Post = require('./models/Post')
const Profile = require('./models/Profile');
//collection.ensureIndex




const user = require('./models/User')
const app = express();
const publicDirectoryPath = path.join(__dirname, './public')
app.use(express.static(publicDirectoryPath))



app.use('/login', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Connect to MongoDB
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose
  .connect(
    'mongodb://localhost:27017/mydemo',
    {
      useNewUrlParser: true,
     useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
// app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// // Routes
// app.use('/', require('./routes/index.js'));
// app.use('/users', require('./routes/users.js'));



const { ensureAuthenticated, forwardAuthenticated } = require('./config/auth');


// Login Page
app.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
app.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
app.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});




app.post('/login', 
  passport.authenticate('local',
    { failureRedirect: '/register' }),
  function(req, res) {
    res.redirect('/posts');
  });



// Logout
app.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});


//Help route
// app.get('/help', (req, res) => {
//   res.render('help')
// })
app.get('/help', ensureAuthenticated, (req, res) =>
  res.render('help', {
    user: req.user
  })
);




app.get('/posts', ensureAuthenticated, (req, res) =>
  res.render('posts', {
    user: req.user.name
  })
);
app.get('/post', ensureAuthenticated, (req, res) => {
  res.render('post')
});


app.get('/create-profile',ensureAuthenticated, (req, res) => {
  res.render('create-profile');
})



app.post('/posts', (req, res) => {
    
  const newPost = new Post({
    text: req.body.text,
    name: req.user.name,
    avatar: req.user.avatar,
    user: req.user.id
  }).save((err, result) => {
      if (err)
        throw err;
      else {
        res.redirect('posts')
      }  
  })
  
})
app.get('/', (req, res) => {
  res.render('welcome')
})



//Create profile
app.post('/create-profile',(req, res) => {

  const newProfile = new Profile({
    name: req.user.name,
    company: req.body.company,
    location:req.body.location,
    website:req.body.website,
    bio:req.body.bio,
    skills:req.body.skills,
    status:req.body.status,
    githubusername:req.body.githubusername,
    youtube:req.body.youtube,
    twitter:req.body.twitter,
    instagram:req.body.instagram,
    linkedin:req.body.linkedin,
    facebook:req.body.facebook
  }).save((err, result) => {
    if (err)
      throw err;
    else {
      res.redirect('create-profile')
    }
  })


})


//Create education
app.get('/add-education', (req, res) => {
  res.render('add-education')
})

//Create experience
app.get('/add-experience', (req, res) => {
  res.render('add-experience')
})





app.get('/display', (req, res) => {
  Post.find({}, function(err, result) {
      if (err) throw err;
    res.send(result)
      
    });
})


app.get('/displayUser', (req, res) => {
  User.find({},function(err, result){
    if(err) throw err;
    res.send(result)
  })
})


app.get('/dashboard',ensureAuthenticated, async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name']);
    res.render('dashboard', {
      company: profiles[0].company,
      status: profiles[0].status,
      name:profiles[0].name
    });
    // console.log(profiles[0].company)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
  

//Git Repo API
//https://api.github.com/users/sayan699/repos?per_page=5&sort=created: asc&client_id=d9308aacf8b204d361fd&client_secret=84969aeef73956f4ec9e8716d1840532802bb81b



app.get('/gitfind',ensureAuthenticated, async (req, res) => {
  const profiles = await Profile.find().populate('user', ['name']);

  const git = await fetch(`https://api.github.com/users/${profiles[0].githubusername}?client_id=d9308aacf8b204d361fd&client_secret=84969aeef73956f4ec9e8716d1840532802bb81b`)
  const profile = await git.json();

  res.json(profile)
 
   
});



app.get('/git', (req, res) => {
  res.render('git')
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))
