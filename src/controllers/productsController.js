const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		return res.render("products",{
			products,
			toThousand
			
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		const {id} = req.params;
		const product = products.find(product => product.id === +id);
		return res.render("detail",{
			...product,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
	const {name,discount,price,description,category,image} = req.body
	const productNew = {
		id : products[products.length -1].id +1,
		name: name.trim(),
		description : description.trim(),
		price : +price,
		discount:+discount,
		image: req.file ? req.file.filename : null,
		category: category
		
		};
		products.push(productNew),
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null,3), 'utf-8')
		return res.redirect('/products')
	},
	
	// Update - Form to edit
	edit: (req, res) => {
		const {id} = req.params;
		const product = products.find(product => product.id === +id);
		return res.render('product-edit-form',{
			...product,
			toThousand
		})
	},
	// Update - Method to update
	update: (req, res) => {
		const {id} = req.params;
		const product = products.find(product => product.id ===+id);
		const {name, price,description,category,discount,image}= req.body;

		const modifiedProduct ={
	        id: +id,
			name: name.trim(),
			description : description.trim(),
			price : +price,
			discount:+discount,
			image: req.file ? req.file.filename : product.image,
			category: category
		}
		const modifiedProducts = products.map(product =>{
			if(product.id === +id){
				return modifiedProduct

				}
				return product

				
			
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(modifiedProducts, null,3), 'utf-8');
		return res.redirect('/products/detail/'+ id)
	},

	// Delete - Delete one product from DB
	removeConfirm : (req,res) => {
		const id = req.params.id;
		const product = products.find(product => product.id === +id);
	
		return res.render('confirmRemove',{
		  ...product
		})
	  },
	  remove : (req,res) => {
		const id = req.params.id;
		const productsModified = products.filter(product => product.id !== +id);
	
	
		fs.writeFileSync(productsFilePath ,JSON.stringify(productsModified, null, 3),'utf-8')
		return res.redirect(`/products`)   
	  }
	
};

module.exports = controller;