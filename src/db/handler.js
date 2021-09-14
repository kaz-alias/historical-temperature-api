const { MongoClient } = require('mongodb');

const user = 'mongo';
const password = 'h9GE1fqY0gB9o7Sc';

class Mongo {
    static async connect() {
        if (this.db) return this.db;
        const uri = `mongodb+srv://${user}:${password}@cluster0.ptzts.mongodb.net/vopakdb?retryWrites=true&w=majority`;
        this.db = await new MongoClient(uri, { useNewUrlParser: true }).connect();
        return this.db;
    }
}

Mongo.db = null;

module.exports = { Mongo };
