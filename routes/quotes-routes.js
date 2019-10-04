const quotes = require("../controllers/quotes-controller");

module.exports = function(app)
{
    app.get("/quotes", quotes.index);
    app.get("/quotes/create", quotes.create);
    app.get("/quotes/:id", quotes.show);
    app.get("/quotes/delete/:id", quotes.destroy);
    app.post("/quotes/create", quotes.store);

    app.get("/quotes/edit/:id", quotes.edit);
    app.post("/quotes/update", quotes.update);
}