const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
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

async function addWin(user)
{
    let userData = await getUserData(user);
    statsCollection.updateOne({ user: user }, { $inc: { wins: 1 } });
    userData.wins++;
    return userData;
}

async function addLoss(user)
{
    let userData = await getUserData(user);
    statsCollection.updateOne({ user: user }, { $inc: { losses: 1 } });
    userData.losses++;
    return userData;
}

async function getUserData(user) {
    const cursor = await statsCollection.find({ user: user });
    const results = await cursor.toArray();

    let userData;
    if (results.length == 0)
    {
        userData = { user: user, wins: 0, losses: 0 };
        await statsCollection.insertOne(userData);
    }
    else
    {
        userData = results[0];
    }
  
    return userData;
}

module.exports = { addWin, addLoss, getUserData };