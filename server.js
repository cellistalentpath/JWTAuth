const express = require("express");
const cors = require("cors");
//const { GenerateJWT, DecodeJWT, ValidateJWT } = require("./dec-inc.js");

const app = express();
//app.disable("x-powered-by");
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3100;

let data = JSON.parse('{ "email" : "null", "password" : "null"}');

app.post("/api/register", (req, res) => {
	data = req.body;
	res.send(data);
});

app.post("/api/sign-in", (req, res) => {
	if (JSON.stringify(req.body) === JSON.stringify(data)) {
		res.send(JSON.parse('{ "success" : "yes"}'));
	} else {
		res.send(JSON.parse('{ "success" : "no"}'));
	}
});

app.get("/", (req, res) => res.send(data));

app.post("/api/GenerateJWT", (req, res) =>
	res.json(GenerateJWT(req.body.header, req.body.claims, req.body.key))
);
app.post("/api/DecodeJWT", (req, res) => res.json(DecodeJWT(req.body.sJWS)));
app.post("/api/ValidateJWT", (req, res) =>
	res.json(ValidateJWT(req.body.header, req.body.token, req.body.key))
);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
