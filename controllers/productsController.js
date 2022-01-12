const Product = require("../models/productModel");

const { getPostData } = require("../utils");

// @desc  Gets All Products
// @route GET /api/products
const getProducts = async function (req, res) {
  try {
    //fetch products
    const products = await Product.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (err) {
    console.log(err);
  }
};

// @desc  Gets Single Product
// @route GET /api/product/:id
const getProduct = async function (req, res, id) {
  try {
    //fetch product
    const product = await Product.findById(id);
    //if there is not products : return 404
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      //Do this
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (err) {
    console.log(err);
  }
};

// @desc  Create a single Product
// @route POST /api/products
const createProduct = async function (req, res) {
  try {
    const body = await getPostData(req);
    const { title, description, price } = JSON.parse(body);

    //post static
    const product = {
      title,
      description,
      price,
    };
    const newProduct = await Product.create(product);
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (err) {
    console.log(err);
  }
};

// @desc  Update a single Product
// @route PUT /api/products/:id
const updateProduct = async function (req, res, id) {
  try {
    //finds the product
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      const body = await getPostData(req);
      const { title, description, price } = JSON.parse(body);

      //post static
      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };
      const updProduct = await Product.update(id, productData);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updProduct));
    }
  } catch (err) {
    console.log(err);
  }
};

// @desc  Delete  Product
// @route DELETE /api/product/:id
const deleteProduct = async function (req, res, id) {
  try {
    //fetch product
    const product = await Product.findById(id);
    //if there is not products : return 404
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      await Product.remove(id);
      //Do this
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: ` Product ${id} removed` }));
    }
  } catch (err) {
    console.log(err);
  }
};

//export getProducts function
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
