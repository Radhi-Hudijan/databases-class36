const { MongoClient } = require("Mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main() {
  try {
    await client.connect();
    await transfer(client, 101, 102, 1000, "party tickets2");
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function transfer(client, fromAccountNo, toAccountNo, amount, remark) {
  const accountCollection = client.db("databaseWeek4").collection("accounts");
  const session = client.startSession();
  const todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");

  try {
    await session.withTransaction(async () => {
      // deduct the amount fromAccount and update
      await accountCollection.updateOne(
        { account_number: fromAccountNo },
        {
          $inc: { balance: -amount, "account_changes.change_number": 1 },
          $set: {
            "account_changes.amount": -amount,
            "account_changes.changed_date": todayDate,
            "account_changes.remark": remark,
          },
        },
        { session }
      );

      // update new account with the amount
      await accountCollection.updateOne(
        { account_number: toAccountNo },
        {
          $inc: { balance: amount, "account_changes.change_number": 1 },
          $set: {
            "account_changes.amount": amount,
            "account_changes.changed_date": todayDate,
            "account_changes.remark": remark,
          },
        },
        { session }
      );
    });
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    console.log("Transaction has been canceled");
  } finally {
    await session.endSession();
    console.log(
      `An amount of ${amount} Euro has been successfully transferred from ${fromAccountNo} to ${toAccountNo} `
    );
  }
}

// },
