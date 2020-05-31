const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs')
const saltRounds = 10

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) throw err;
    const username = req.body.username;
    const password = hash;
    const newUser = new User({ username, password });

    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => {
        res.status(400).json('Error: ' + err)
      })
  });
});
router.route('/login').post((req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) res.json({ err: "Wrong username or password!" })
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!result) res.json('')
        else res.json(user)
      })
    } else {
      res.json('')
    }
  })
})
router.route('/updateAdmin').post((req, res) => {
  User.findById(req.body._id)
    .then(user => {
      user.username = req.body.username
      user.password = req.body.password
      user.admin = !user.admin

      user.save()
        .then(() => res.json("User updated!"))
        .catch(err => res.status(400).json('Error: ' + err));
    })

})
router.route('/updatePassword').post((req, res) => {
  console.log(req.body)
  User.findById(req.body.user._id)
    .then(user => {
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) throw err;
        user.username = req.body.user.username
        user.password = hash
        user.save()
          .then(() => res.json("User updated!"))
          .catch(err => res.status(400).json('Error: ' + err));
      });

    })

})
router.route('/delete/:id').delete((req, res) => {
  console.log(req.params.id)
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted!"))
    .catch(err => res.status(400).json('Error: ' + err));

})
module.exports = router;