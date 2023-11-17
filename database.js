const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const statsCollection = db.collection('userStats');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
})().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

function addWin(user)
{
    let userData = getUserData(user);
    statsCollection.updateOne({ user: user }, { $inc: { wins: 1 } });
    userData.wins++;
    return userData;
}

function addLoss(user)
{
    let userData = getUserData(user);
    statsCollection.updateOne({ user: user }, { $inc: { losses: 1 } });
    userData.losses++;
    return userData;
}

function getUserData(user) {
    const cursor = statsCollection.find({ user: user });
    const results = cursor.toArray();

    let userData;
    if (results.length == 0)
    {
        userData = { wins: 0, losses: 0 };
        statsCollection.insertOne({ user: user, wins: 0, losses: 0 });
    }
    else
    {
        userData = results[0];
    }
  
    return userData;
}

module.exports = { addWin, addLoss, getUserData };