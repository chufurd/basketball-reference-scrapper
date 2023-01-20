const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://chufurd:0bPM8hXrbStG4jJB@cluster0.zisfzrw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
const players = JSON.parse(fs.readFileSync('players.json'));

client.connect(err => {
    if(err) {
        console.log("Error connecting to MongoDB: " + err);
    } else {
        const collection = client.db("test").collection("players");
        collection.insertMany(players, function(err, res) {
            if(err) {
                console.log("Error inserting data: " + err);
            } else {
                console.log("Number of documents inserted: " + res.insertedCount);
            }
            client.close();
        });
    }
});
