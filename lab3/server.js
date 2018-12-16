const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});
let list=["Киев", "Одесса","Кривой Рог","Черкассы"];
let text=["Введите город"];
app.use(express.static(__dirname));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.get("/lab3.html",function (request,response) {
    response.sendFile("/lab3.html");
});
app.get("/list",function (request,response) {
    response.send(list);
});
app.get("/text",function(request,response){
    response.send(JSON.stringify(text));
});
app.post("/add",urlencodedParser,function (request,response) {
    list.push(request.body.country);
    response.send(list);
});
app.listen(3000);
