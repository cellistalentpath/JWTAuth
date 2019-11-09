const express = require("express");
const cors = require("cors");
//const { GenerateJWT, DecodeJWT, ValidateJWT } = require("./dec-inc.js");

const app = express();
//app.disable("x-powered-by");
app.use(express.json());
app.use(cors());
// app.header("Access-Control-Allow-Origin", "*");
const port = process.env.PORT || 3100;

let data = JSON.parse(
	'{ "email" : "test@gmail.com", "password" : "password3"}'
);

//const welcomeMessage = JSON.parse(message);

app.post("/api/register", (req, res) => {
	//data = req;
	data = req.body;
	res.send(data);
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
