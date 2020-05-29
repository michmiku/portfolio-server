const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const newUser = new User({ username, password });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => {
      res.status(400).json('Error: ' + err)
    });
});
router.route('/login').post((req, res) => {
  User.find({ username: req.body.username })
    .then(users => {
      if (users.length == 0 || req.body.password != users[0].password) {
        console.log("Wrong username or password!")
        res.json('')
      }
      else {
        res.json(users)
        console.log("success")
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
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
      user.username = req.body.user.username
      user.password = req.body.password
      user.save()
        .then(() => res.json("User updated!"))
        .catch(err => res.status(400).json('Error: ' + err));
    })

})
router.route('/delete/:id').delete((req, res) => {
  console.log(req.params.id)
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted!"))
    .catch(err => res.status(400).json('Error: ' + err));

})
module.exports = router;