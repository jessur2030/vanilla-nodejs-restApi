const http = require("http");
//productController
//productController.getProducts
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/productsController");

//req url helper function
const reqUrlHandler = function () {};

const server = http.createServer((req, res) => {
  //GET all products
  if (req.url === "/api/products" && req.method === "GET") {
    //from controller
    getProducts(req, res);
  }

  //GET a single product by id
  //regEx: get an id from 0 to 9 + /\/api\/products\/([0-9]+)/
  else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    //from controller
    getProduct(req, res, id);
    //handle POST req
  } else if (req.url === "/api/products" && req.method === "POST") {
    //from controller
    createProduct(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3];
    updateProduct(req, res, id);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    deleteProduct(req, res, id);
  }

  //Returns 404
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

// with express: /api/products/:id
//req.params.id
//first checks if there is an environment variable or port 9000
const PORT = process.env.PORT || 9000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
