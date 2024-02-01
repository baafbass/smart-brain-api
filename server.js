	import express from 'express';
	import bodyParser from 'body-parser';
	import bcrypt from 'bcryptjs';
	import cors from 'cors';
	import knex from 'knex';
	import {handleRegister} from './controllers/register.js';
	import {handleSignin} from './controllers/signin.js';
	import {handleProfileGet} from './controllers/profile.js';
	import {handleImage} from './controllers/image.js';
	import {handleApiCall} from './controllers/image.js';

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

	const app = express()

	app.use(bodyParser.json());
	app.use(cors());

	app.get('/',(req,res)=>{res.send('success');})

	app.post('/signin',(req,res) => {handleSignin(req,res,db,bcrypt)})

	app.post('/register', (req,res)=>{ handleRegister(req,res,db,bcrypt,saltRounds)} )

	app.get('/profile/:id',(req,res)=>{handleProfileGet(req,res,db)})

	app.put('/image',(req,res)=>{handleImage(req,res,db)})

	app.post('/imageurl',(req,res)=>{handleApiCall(req,res)})

	app.listen(process.env.PORT || 3000,()=>{
		console.log(`app is running on port ${process.env.PORT}`)
	})
