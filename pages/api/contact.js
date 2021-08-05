import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim === ""
    ) {
      res.status(422).json({ message: "Invalid input!" });
      return;
    }

    const newMessage = { name, email, message };

    let client;

    try {
      client = await MongoClient.connect(
        `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.xxgqi.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
      );
    } catch (error) {
      res.status(500).json({ message: "Connection to database failed!" });
      return;
    }

    try {
      const db = client.db();
      const result = await db.collection("messages").insertOne(newMessage);

      res.status(201).json({
        message: "Successfully stored message!",
        message: { ...newMessage, id: result.insertedId },
      });
    } catch (error) {
      res.status(500).json({ message: "Storing message failed!" });
    }

    client.close();
  }
};

export default handler;
