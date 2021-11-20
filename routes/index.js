var express = require('express');
var router = express.Router();
var passport = require('passport');
const users =
  [
    {
      id: 01, email: "shahabazkc@gmail.com", password: "1234"
    },
    {
      id: 02, email: "admin", password: "0000"
    }
  ];
const initializePassport = require('../passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)


/* GET home page. */
router.get('/', checkAuthenticated, function (req, res, next) {
  console.log(req.user);
  res.render('index',{name:req.user.email});
});
router.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login')
})
router.post('/login',passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: "/login",
  failureFlash: true
}))

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    
    return next()
  }
console.log("not authenticated");
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("authenticated already")
    return res.redirect('/')
  }
  next()
}
module.exports = router;
