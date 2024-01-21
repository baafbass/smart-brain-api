import express from 'express'

const app = express()

app.get('/',(req,res)=>{
	res.send('This is working');
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