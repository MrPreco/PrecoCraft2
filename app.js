const express = require("express");
const path = require("path");

const app = express();

FILES = path.resolve(__dirname, '');
//app.use('/', serveIndex( path.resolve(FILES) ));
app.use('/', express.static( path.join(FILES) ));

app.get("/", (req, res)=>{
    //res.send("Hello world");
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/spriteFrameEditor", (req, res)=>{
    //res.send("Hello world");
    res.sendFile(path.join(__dirname + "/Editor/spriteFrameEditor/index.html"));
});

app.get("/CharacterSpriteEditor", (req, res)=>{
    //res.send("Hello world");
    res.sendFile(path.join(__dirname + "/Editor/CharacterSpriteEditor/index.html"));
});

app. listen(5000, ()=>{
    console.log("Server linstening on port", 5000);
});