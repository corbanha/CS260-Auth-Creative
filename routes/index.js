var express = require('express');
var router = express.Router();
var expressSession = require('express-session');

var mongoose = require('mongoose'),
  User = mongoose.model('User');

var users = require('../controllers/users_controller');
console.log("before / Route");
router.get('/', function(req, res){
    console.log("/ Route");
//    console.log(req);
    console.log(req.session);
    if (req.session.user) {
      console.log("/ Route if user");
      
      res.render('game', {username: req.session.username,
                           msg:req.session.msg,
                           color:req.session.color,
                           highscore: req.session.number_games_played
      });
      //res.render('index', {username: "test", msg: "It worked", color: "red"});
    } else {
      console.log("/ Route else user");
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
router.get('/user', function(req, res){
    console.log("/user Route");
    if (req.session.user) {
      res.render('user', {msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
router.get('/signup', function(req, res){
    console.log("/signup Route");
    if(req.session.user){
      res.redirect('/login');
    }
    res.render('signup', {msg:req.session.msg});
});
router.get('/leaderboard', function(req, res) {
  console.log('/leaderboard Router');
  if (req.session.user) {
    res.render('leaderboard', {username: req.session.username,
                           msg:req.session.msg,
                           color:req.session.color,
                           highscore: req.session.number_games_played
      })
  }
})
router.get('/chat', function(req, res) {
  console.log('/chat Router');
  if (req.session.user) {
    res.render('chat');
  }
})
router.get('/login',  function(req, res){
    console.log("/login Route");
    if(req.session.user){
      res.redirect('/game');
    }
    res.render('login');
});
router.get('/logout', function(req, res){
    console.log("/logout Route");
    req.session.destroy(function(){
      res.redirect('/');
    });
  });
router.post('/signup', users.signup);
router.post('/user/update', users.updateUser);
router.post('/user/delete', users.deleteUser);
router.post('/login', users.login);
router.post('/updateHighscore', users.updateHighscore);
router.get('/user/profile', users.getUserProfile);
router.get('/getAllUsers', users.getAllUsers);

module.exports = router;
/*
router.get('/highscores', function(req, res, next){
  console.log("Getting highscores");
  TetrisScores.find(function(err, scores){
    if(err){
      return next(err);
    }else{
      res.json(scores);
    }
  })
});

/*
router.post('/highscores', function(req, res, next){
  console.log("Posting high scores");
  var scoreToAdd = new TetrisScores(req.body);
  scoreToAdd.save(function(err, score){
    if(err){
      return next(err);
    }
    res.sendStatus(200);
  })
});*/