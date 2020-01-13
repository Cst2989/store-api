// ./controllers/product
const Model = require('../model');
const {Product} = Model;

const productController = {
    all (req, res) {
        // Returns all products
        Product.find({})
            .exec((err, products) => res.json(products))
    },
    byId (req, res) {
        const idParam = req.params.id;
        // Returns a single product
        // based on the passed in ID parameter
        Product
            .findOne({_id: idParam})
            .exec( (err, product) => res.json(product) );
    },
    create (req, res) {
        const requestBody = req.body;
        // Creates a new record from a submitted form
        const newProduct = new Product(requestBody);
        // and saves the record to
        // the data base
        newProduct.save( (err, saved) => {
            // Returns the saved product
            // after a successful save
            Product
                .findOne({_id: saved._id})
                .exec((err, product) => res.json(product));
        } )
    },
    update (req, res) {
        const idParam = req.params.id;
        let product = req.body;
        // Finds a product to be updated
        Product.findOne({_id: idParam}, (err, data) => {
            // Updates the product payload
            data.name = product.name;
            data.year = product.year;
            data.location = product.location;
            data.description = product.description;
            data.image = product.image;
            data.price = product.price;
            // Saves the product
            data.save((err, updated) => res.json(updated));
        })
    },
    remove (req, res) {
        const idParam = req.params.id;
        // Removes a product
        Product.findOne({_id: idParam}).remove( (err, removed) => res.json(idParam) )
    }
};

module.exports = productController;
