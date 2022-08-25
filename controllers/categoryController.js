const Product = require('../models/productSchema');

const categoryController = {
  // sorted product by category
  productSorted: async (req, res) => {
    try {
      const result = await Product.find({ category: req.params.category });
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // delete by category
  categoryDelete: async (req, res) => {
    try {
      const result = await Product.deleteMany({
        category: req.params.category,
      });
      console.log(result);
      res.status(200).send('Deleted successfully');
    } catch (error) {
      res.status(500).send(error);
    }
  },
  
};

module.exports = categoryController;
