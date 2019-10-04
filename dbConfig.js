//mongo config
const conString = "mongodb+srv://maciekmaka:maciekmaka123456@firstcluster-1imqu.mongodb.net/test?retryWrites=true&w=majority";
const mongo = require("mongodb").MongoClient;


module.exports = async function()
{
    try 
    {
        const con = await mongo.connect(conString,{useNewUrlParser:true,useUnifiedTopology: true});  
        const db = await con.db("mongo-intro");
        return db;
    } 
    catch (error) 
    {
        process.exit();
    }
}