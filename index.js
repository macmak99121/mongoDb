const express = require("express");


// db config
/* const tingo = require("tingodb")().Db;
const db = new tingo("./database",{});
const col = db.collection("quotes"); */

const app = express();
//OBS viktigt för att parsa vår formulärdata >>> req.body
app.use(express.urlencoded({extended:false}));

// fixar så att vi kan få css och front-end-javascript i filer som alla vyer kan använda sig av...
app.use(express.static(__dirname+"/public"));
app.set("view engine", "ejs");
require("./routes/quotes-routes")(app);

app.listen(3000, function(){console.log("localhost:3000/quotes")});
