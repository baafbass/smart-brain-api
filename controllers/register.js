	const handleRegister = (req,res,db,bcrypt,saltRounds)=>{
	const {name,email,password} = req.body;
	if(!email || !name || !password)
	{
		return res.status(400).json('Incorrrect form submission');
	}
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
	}

	export {handleRegister}