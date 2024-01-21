import express from 'express';
import bodyParser from 'body-parser';

const app = express()

app.use(bodyParser.json());

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
      	password: 'junky',
      	entries: 0,
      	joined: new Date()
      }
	]
}

app.get('/',(req,res)=>{
	res.json(database.users);
})

app.post('/signin',(req,res)=>{
	if(req.body.email === database.users[0].email && req.body.password === database.users[0].password)
	{
		res.json('success');
	} else {
		res.status(400).json('error logging in');
	}
})

app.post('/register',(req,res)=>{
	const {name,email,password} = req.body;
	database.users.push(
	{
      	id: '125',
      	name: name,
      	email: email,
      	password: password,
      	entries: 0,
      	joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})

app.listen(3000,()=>{
	console.log('app is running on port 3000')
})



/*
/ --> res = this is working
/ signin --> POST = success/fail
/ register --> POST = user
/profile/:userid --> GET = user
/image --> PUT --> user
*/