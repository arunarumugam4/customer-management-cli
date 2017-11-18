#!/usr/bin/env node


const program = require('commander');
const {prompt} = require('inquirer');
const {
	addCustomer,
	findCustomer,
	updateCustomer,
	removeCustomer,
	listCustomers
} = require('./index');

// customer questions
const questions = [
    {
    	type:'input',
    	name : 'firstName',
    	message: 'customer first name'
    },
    {
    	type:'input',
    	name : 'lastName',
    	message: 'customer last name'
    },
    {
    	type:'input',
    	name : 'phone',
    	message: 'customer phone number'
    },
    {
    	type:'input',
    	name : 'email',
    	message: 'customer email address'
    }
]


program
   .version('1.0.0')
   .description('Client Management System');

/*program
   .command('add <firstName> <lastName> <phone> <email>')
   .alias('a')
   .description('Add a customer')
   .action((firstName, lastName, phone, email) => {
   	addCustomer({firstName,lastName, phone, email})
   })*/


// add command
program
   .command('add')
   .alias('a')
   .description('add new customer')
   .action(() => {
   	prompt(questions).then(answers => addCustomer(answers)); 
   })

//find command
program
   .command('find <name>')
   .alias('f')
   .description('find a customer')
   .action((name) => {
   	findCustomer(name)
   })

// update command
program
   .command('update <_id>')
   .alias('u')
   .description('update a customer')
   .action((_id) => {
   	prompt(questions).then(answers => updateCustomer(_id,answers)); 
   })


// rmove command
program
   .command('remove <_id>')
   .alias('r')
   .description('remove a customer')
   .action((_id) => {
   	removeCustomer(_id)
   })


// list command
program
   .command('list')
   .alias('l')
   .description('list all customers')
   .action(() => {
   	    listCustomers();
   })


program.parse(process.argv);