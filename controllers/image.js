
const returnsetupClarifaiRequestOptions = (imageURL) =>{
    const PAT = 'f2e9e5cd97cf46edabb328d372ecabcd';
    const USER_ID = 'baafbass';       
    const APP_ID = 'smartbrain';
    const MODEL_ID = 'face-detection';    
    const IMAGE_URL = imageURL;

        const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

         const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

return requestOptions;
}

const handleApiCall = (req,res) =>{
	fetch("https://api.clarifai.com/v2/models/" 
  + 'face-detection' + "/outputs", 
  returnsetupClarifaiRequestOptions(req.body.input))
	.then(result => result.json())
	.then(data => {
		  res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with API'));
}

	const handleImage = (req,res,db)=>{
		const {id} = req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0].entries);
	})
	.catch(err => res.status(400).json('unable to get entries'));
	}

	export {handleImage}
	export {handleApiCall}