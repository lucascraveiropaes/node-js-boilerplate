import { MongoClient } from "mongodb";

const password = "";
const user = "";
const db = "";
const uri = `mongodb+srv://${user}:${password}@cluster0-dr81f.gcp.mongodb.net/test?retryWrites=true&w=majority`;

function Database(callback = () => null) {
    return MongoClient.connect(uri, (err, client) => {
        if (err) return false;

        global.database = client.db(db);

        return callback();
    })
}

export default Database;
