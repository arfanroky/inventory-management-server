const People = require('../models/peopleSchema');
const bcrypt = require('bcrypt');

const peopleController = {
  // people add
  peopleAdd: async (req, res) => {
    try {
      // get user data
      const { name, email, password } = req.body;

      // check field
      if (!name || !email || !password)
        return res.status(500).send({
          error: 'All fields are required!',
        });

      // find user
      const findUser = await People.findOne({ email });

      // check user is exists
      if (!findUser) {
        const salt = await bcrypt.genSalt(Number(10));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const userInfo = {
          name,
          email,
          password: hashPassword,
        };

        // save user
        await new People(userInfo).save();

        res.status(200).send({
          message: 'User added successfully!',
        });
      } else {
        return res.status(409).send({
          error: 'Email already exists!',
        });
      }
    } catch (error) {
      res.status(500).send({
        error: 'Internal server error!',
      });
    }
  },

  // get user by email
  singleUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(500).send('Invalid email or password');

      // find user by email
      const findUser = await People.findOne({ email: req.body.email });

      // check email exists
      if (!findUser) {
        return res.status(500).send({
          error: 'Invalid email!',
        });
      }

      // compare password
      const comparePass = await bcrypt.compare(
        req.body.password,
        findUser.password
      );

      //  check wrong or right
      if (!comparePass) {
        return res.status(500).send({
          error: 'Invalid password!',
        });
      }

      return res.status(200).send(findUser);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // update people profile
  updateProfile: async (req, res) => {
    try {
      const filter = { email: req.body.email };
      const updateDoc = { $set: req.body };
      const options = { new: true, upsert: true };

      await People.updateOne(filter, updateDoc, options);
      res.status(200).send('success update');
    } catch (error) {
      res.status(500).send(error);
    }
  },
  
};

module.exports = peopleController;
