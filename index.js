const mongoose = require('mongoose');

// change mongoose promise by global javascript promise
mongoose.Promise = global.Promise;

// connect to db
const db = mongoose.connect("mongodb://localhost:27017/customercli", {
	useMongoClient: true
})

// import model
const Customer = require('./models/customer');

// add customer
const addCustomer = (customer) => {
	Customer.create(customer).then(customer => {
		console.log('New Customer Added');
		db.close();
	})
}

// find customer 

const findCustomer = (name) => {
	// Make case insensitive
	const search = new RegExp(name,'i');
	Customer.find({$or:[{firstName: search},{lastName: search}]})
	.then(customer => {
		console.info(customer);
		console.info(`${customer.length} matches`);
		db.close();
	})
}



// update customer
const updateCustomer = (_id, customer) => {
	console.log('hey');
	Customer.update({_id}, customer)
	.then(customer => {
		console.info('Customer Updated');
		db.close();
	})
}



// remove customer
const removeCustomer = (_id) => {
	Customer.remove({_id})
	.then(customer => {
		console.info('Customer removed');
		db.close()
	})
}

// list customers
const listCustomers = () => {
	Customer.find()
	.then(customers => {
		console.info(customers)
		console.log(`${customers.length} matches`)
		db.close()
	})
}

// Export All Methods

module.exports = {
	addCustomer,
	findCustomer,
	updateCustomer,
	removeCustomer,
	listCustomers
}

