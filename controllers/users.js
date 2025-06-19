const User = require('../models/user');

function getUser(req, res) {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => {
      console.log(`User with ID ${userId} could not be found.`);
    })
    .then((user) => res.send(user))
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { getUser };
