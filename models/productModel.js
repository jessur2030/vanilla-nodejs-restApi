// const products = require("../data/products.json");
let products = require("../data/products.json");
//brings uuidv4
const { v4: uuidv4 } = require("uuid");

const { writeDataToFile } = require("../utils");

const findAll = function () {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
};

const findById = function (id) {
  return new Promise((resolve, reject) => {
    //gets specific product
    const product = products.find((p) => p.id === id);
    resolve(product);
  });
};

//create product function
const create = function (product) {
  return new Promise((resolve, reject) => {
    writeDataToFile("./data/products.json", products);
    resolve(newProduct);
  });
};

//Update product function
const update = function (id, product) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id === id);
    products[index] = { id, ...product };
    writeDataToFile("./data/products.json", products);
    resolve(products[index]);
  });
};

//Update product function
const remove = function (id) {
  return new Promise((resolve, reject) => {
    products = products.filter((p) => p.id !== id);
    writeDataToFile("./data/products.json", products);
    resolve();
  });
};
module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
