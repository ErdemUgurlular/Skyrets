import  express  from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const port = 3000;

var totalSecretsAbout = [];
var totalSecretsInfo = [];
var currentSecret = [];

app.get("/", (req,res) => {
    res.render("main.ejs")
})

app.get("/secrets", (req,res) => {
    const secretsAbt = totalSecretsAbout;
    const secretInf = totalSecretsInfo;
    const data = {
        secretsAbout: secretsAbt,
        secretsInfo: secretInf
    }
    res.render("secrets.ejs", data)
})

app.get("/new-secret", (req,res) => {
    res.render("new-secret.ejs")
})

app.post("/secrets-new", (req,res) => {;
    const secretsAbt = totalSecretsAbout;
    const secretsInf = totalSecretsInfo;
    totalSecretsAbout.push(req.body["secretAbout"]);
    totalSecretsInfo.push(req.body["secretInfo"]);
    const data = {
        secretsAbout: secretsAbt,
        secretsInfo: secretsInf
    }
    res.render("secrets.ejs", data)
})

app.post("/secrets-delete", (req,res) => {  
    const secretsAbt = totalSecretsAbout;
    const secretsInf = totalSecretsInfo;
    totalSecretsAbout.splice(req.body["deleteBtn"], 1);
    totalSecretsInfo.splice(req.body["deleteBtn"], 1);
    const data = {
        secretsAbout: secretsAbt,
        secretsInfo: secretsInf
    }
    res.render("secrets.ejs", data)
})

app.post("/secret-adjustment", (req,res) => {
    currentSecret.splice(0, 1, req.body["adjBtn"]);
    const currentScrt = currentSecret
    const secretsAbt = totalSecretsAbout[currentScrt];
    const secretsInf = totalSecretsInfo[currentScrt];
    const data = {
        currentSecretsAbout: secretsAbt,
        currentSecretsInfo: secretsInf
    }
    res.render("secret-adjustment.ejs", data)
})

app.post("/secrets-adj-new", (req,res) => {
    const crntScrt = currentSecret 
    totalSecretsAbout.splice(crntScrt, 1, req.body["adjSecretAbout"]);
    totalSecretsInfo.splice(crntScrt, 1, req.body["adjSecretInfo"]);
    const secretsAbt = totalSecretsAbout;
    const secretsInf = totalSecretsInfo;
    const data = {
        secretsAbout: secretsAbt,
        secretsInfo: secretsInf
    }
    res.render("secrets.ejs", data) 
})

app.listen(port, (req,res) =>{
    console.log(`Server running on ${port}`);
})