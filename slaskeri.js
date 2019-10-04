app.get("/quotes",(req,res)=>
{
    col.find().toArray((err,data)=>
    {
        if(!err)
        {
            /*
            data = JSON.stringify(data.reverse(),null,"\t");
            res.send("<pre>" + data + "</pre");
            */
           
            const html = data.reverse().map(val=>
            {
                return `
                    <h2>${val.author}</h2>
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
});
app.post("/quotes/create", async(req,res)=>
{
    try
    {
        await col.insert(req.body)
        res.redirect("/quotes");    
    }
    catch(err)
    {
        res.send("No quotes created");
    }
});

app.get("/quotes/create",(req,res)=>
{
    res.sendFile(__dirname+"/form-quote.html");
});

app.get("/quotes/delete/:id",(req,res)=>
{
    col.remove({"_id": objectId(req.params.id)}, (err)=>
    {
        res.redirect("/quotes");
    });
});

app.get("/quotes/update/:id/:q", async(req,res)=>
{
    try
    {
        const data = await col.findOne({"_id": objectId(req.params.id)});   
        const newData = {...data, quote:req.params.q}
        await col.updateOne({"_id": objectId(req.params.id)},newData);
        res.redirect("/quotes");
    }
    catch(err)
    {
        res.send("Nothing was updated...");
    }
});