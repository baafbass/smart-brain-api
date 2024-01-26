import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';

const saltRounds = 10;

const db = knex({
	client: 'pg',
	connection:{
		host: '127.0.0.1',
		user: 'postgres',
		port: '5432',
		password:'BAAF-BASS',
		database: 'smartBDB'
	}
})

db.select('*').from('users').then(data => {
	console.log(data);
});

const app = express()

app.use(bodyParser.json());
app.use(cors());

const database = {
	users : [
      {
      	id: '123',
      	name: 'farid',
      	email: 'farid@gmail.com',
      	password: 'bass1971',
      	entries: 0,
      	joined: new Date()
      },
      {
      	id: '124',
      	name: 'Top G',
      	email: 'topg@gmail.com',
      	password: 'nana1978',
      	entries: 0,
      	joined: new Date()
      }
	],
	login: [
      {
      	id: '',
      	hash: '',
      	email: 'farid@gmail.com'
      }
	]
}

app.get('/',(req,res)=>{
	res.json(database.users);
})

app.post('/signin',(req,res)=>{
	// Load hash from your password DB.
// bcrypt.compare("nana1978", "$2b$10$.2spfgdacCEeqzWbFihdVeaWbPe2IyjJos4KxqIxx8DX1oKPpFlZa", function(err, result) {
//     console.log('first guess',result)
// });
// bcrypt.compare("veggies", "$2b$10$.2spfgdacCEeqzWbFihdVeaWbPe2IyjJos4KxqIxx8DX1oKPpFlZa", function(err, result) {
//     console.log('Second guess',result)
// });
	if(req.body.email === database.users[0].email && req.body.password === database.users[0].password)
	{
		res.json(database.users[0]);
	} else {
		res.status(400).json('error logging in');
	}
})

app.post('/register',(req,res)=>{
	const {name,email,password} = req.body;
   //  bcrypt.hash(password, saltRounds, function(err, hash) {
   //  console.log(hash);
   // });

db('users')
.returning('*')
.insert({
	email: email,
	name: name,
	joined : new Date()
}).then(user => {
	res.json(user[0]);
})
.catch(err => res.status(400).json('unable to register'))
})

app.get('/profile/:id',(req,res)=>{
	const {id} = req.params;
db.select('*').from('users').where({id})
.then(user => {
if(user.lenght){
	res.json(user[0])
}else{
	res.status(400).json('Not found')
}

})
.catch(err => res.status(400).json('Error getting user'));
})

app.put('/image',(req,res)=>{
	const {id} = req.body;
db('users').where('id','=',id)
.increment('entries',1)
.returning('entries')
.then(entries => {
	res.json(entries[0].entries);
})
.catch(err => res.status(400).json('unable to get entries'));
})


// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000,()=>{
	console.log('app is running on port 3000')
})
