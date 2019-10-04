const objectId = require("mongodb").ObjectID;
const path = require("path");

class Quote
{
    constructor(author,quote)
    {
        this.author = author;
        this.quote = quote;
        this.timestamp = Date.now();
        this.checkAuthor();
    }

    checkAuthor()
    {
        if(this.author.length < 2)
        {
            this.author = this.author + "extra chars";
        }
    }
}

let db; 
let col;
(async function()
{ 
    db = await require("../dbConfig")();
    col = await db.collection("quotes");
})();

module.exports = {

index: async function(req,res)
{
    const data = await col.find().toArray();
    res.render("quotes",{data});
},
show: async function(req,res)
{
    col.find().toArray((err,data)=>
{
    if(!err)
    {  
        const html = data.reverse().map(val=>
        {
            return `
                <h2>${val.author}<ss/h2>
                <p>${val.quote}</p>
                <a href = "/quotes/delete/${val._id}">delete:</a> ${val._id}
                <hr>
            `
        });
        const output = html.join("");
        res.send(output);
    }
    else
    {
        res.send(err.message);
    }
});
},
    destroy: async function(req,res)
    {
        try 
        {
            col.deleteOne({"_id": objectId(req.params.id)}, (err)=>
            {
                res.redirect("/quotes");
            });
        } 
        catch (error) 
        {
            res.send("Inget togs bort...")
        }
    },
    create: async function(req,res)
    {
        try 
        {
            res.sendFile(path.join(__dirname, "../views/form-quote.html"));
        } 
        catch (error) 
        {
            res.send("Inget skapades...")
        }  
    },
    store: async function(req,res)
    {
        const quote = new Quote(req.body.author,req.body.quote);

        try 
        {
            await col.insertOne(quote)
            res.redirect("/quotes");  
        } 
        catch (error)
        {
            res.send("Inget nytt skapades...")
        }
    },
    edit: async function(req,res)
    {
        try 
        {
        const data = await col.findOne({"_id":objectId(req.params.id)});
        let response = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Edit Quote</title>
        </head>
        <body>          
            <form action="/quotes/update" method="post">
                <input type="text" name="author" value="${data.author}" placeholder="Author">
                <br>
                <input type="text" name="quote" value="${data.quote}" placeholder="your quote...">
                <input type = "hidden" name="id" value="${data._id}">
                <br>
                <input type="submit" value="Update">     
            </form>     
            <style>
                input
                {
                    width: 100%;
                    padding: 2%;
                    font-size: 1.3rem;
                    box-sizing: border-box;
                }
            </style> 
        </body>
        </html>
        `;
            //hämta datan från en specific quote...
            res.send(response);
        } 
        catch (error)
        {
            res.send("Error 420")
        }
    },
    update: async function(req,res)
    {
        try 
        {
            const  newData = {author: req.body.author, quote: req.body.quote, timestamp: Date.now()};
            await col.updateOne({"_id": objectId(req.body.id)},{$set:newData});
            res.redirect("/quotes");
        } 
        catch (error) 
        {
            res.send("aeeeej nu har koden bitit sig själv i svansen någonstans...")
        }
    }
};