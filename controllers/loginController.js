const People = require('../models/peopleSchema');
const bcrypt = require('bcrypt');

const loginController = async (req, res) => {
  const findUser = await People.findOne({ email: req.body.email });

  if (!findUser) {
    return res.status(500).send({
      error: 'Invalid email!',
    });
  }

  const comparePass = await bcrypt.compare(
    req.body.password,
    findUser.password
  );

  if (!comparePass) {
    return res.status(500).send({
      error: 'Invalid password!',
    });
  }

  return res.status(200).send(findUser);
};

module.exports = loginController;
