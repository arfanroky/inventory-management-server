const Product = require('../models/productSchema');

const productController = {
  // Product Add
  productAdd: async (req, res) => {
    try {
      const { pName, price, rating, category } = req.body;

      if (!pName || !price || !rating || !category) {
        return res.status(500).send({
          error: 'All product filed are required!',
        });
      }

      const newProduct = { pName, price, rating, category };

      await new Product(newProduct).save();

      res.status(200).send({
        success: 'Product added successfully!',
      });
    } catch (error) {
      res.status(500).send({
        error: error.errors,
      });
    }
  },

  // Get all product
  productGetAll: async (req, res) => {
    try {
      const query = {
        category: "Technologies"
      };
      const result = await Product.find(query);

      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error)
    }
  },

  // Product Update
  productUpdate: async (req, res) => {
    try {
      const id = req.params.id;
      const { pName, price, rating, category } = req.body;

      if (!pName || !price || !rating || !category) {
        return res.status(500).send('which field do you want to update?');
      }

      // update data
      const updateDoc = { pName, price, rating, category };
      const update = {
        $set: updateDoc,
      };

      // options
      const options = { new: true };
      // `doc` is the document _after_ `update` was applied because of
      // `new: true`

      //check id
      const checkId = await Product.findById(id);

      if (!checkId)
        return res.status(200).send({
          error: 'Invalid id',
        });

      const doc = await Product.findByIdAndUpdate(id, update, options);

      res.status(200).send({
        success: 'Updated successfully',
        doc,
      });
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  },

  // Product Delete
  productDelete: async (req, res) => {
    try {
      const id = req.params.id;
      await Product.findByIdAndDelete(id);
      res.status(200).send({
        success: 'delete',
      });
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  },


};

module.exports = productController;
