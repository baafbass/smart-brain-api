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

app.get('/',(req,res)=>{
	res.send('success');
})

app.post('/signin',(req,res)=>{
db.select('email','hash').from('login')
.where('email','=',req.body.email)
.then(data => {
	const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
	console.log(isValid);
	if(isValid)
	{
		return db.select('*').from('users')
		.where('email','=',req.body.email)
		.then(user =>{
			console.log(user);
			res.json(user[0]);
		})
		.catch(err => res.status(400).json('unable to get user'));
	}else
	{
		res.status(400).json('Wrong Credentials')
	} 
})
.catch(err => res.status(400).json('Wrong Credentials'))
})

app.post('/register',(req,res)=>{
	const {name,email,password} = req.body;
const hash = bcrypt.hashSync(password, saltRounds);

db.transaction(trx => {
	trx.insert({
		hash: hash,
		email: email
	})
	.into('login')
	.returning('email')
	.then(loginEmail =>{
        trx('users')
    .returning('*')
    .insert({
	email: loginEmail[0].email,
	name: name,
	joined : new Date()
}).then(user => {
	res.json(user[0]);
})
	})
	.then(trx.commit)
	.then(trx.rollback)
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

app.listen(3000,()=>{
	console.log('app is running on port 3000')
})
