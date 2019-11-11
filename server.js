const express = require('express');
const cors = require('cors');
//const { GenerateJWT, DecodeJWT, ValidateJWT } = require("./dec-inc.js");

const app = express();
//app.disable("x-powered-by");
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3100;

let data = JSON.parse(
	'{ "users": [ { "email" : "test@test.com", "password" : "pass42"}, { "email" : "hello@hello.com", "password" : "hello"} ] }'
);

app.post('/api/register', (req, res) => {
	if (JSON.stringify(req.body.email).includes('@')) {
		data.users.push(req.body);
		res.send('Successfully registered');
	} else {
		res.send('You need an @ symbol');
	}
});

app.post('/api/sign-in', (req, res) => {
	for (let user of data.users) {
		let { email, password } = user;
		if (email === req.body.email && password === req.body.password) {
			res.send('Sign-in successful');
			return;
		}
	}
	res.send('Sign-in failed');
});

app.get('/', (req, res) => res.send(data));

app.post('/api/GenerateJWT', (req, res) =>
	res.json(GenerateJWT(req.body.header, req.body.claims, req.body.key))
);
app.post('/api/DecodeJWT', (req, res) => res.json(DecodeJWT(req.body.sJWS)));
app.post('/api/ValidateJWT', (req, res) =>
	res.json(ValidateJWT(req.body.header, req.body.token, req.body.key))
);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
