const mongoose = require("mongoose");
const { Document } = require("../src/models/doc.model");
const { Interaction } = require("../src/models/interaction.model");

// Connection URL
const url = process.env.MONGO_DB_URI;

(async () => {
  await mongoose.connect(url);
  // Generate 10,000 documents
  let documents = [];
  await Document.deleteMany({});
  for (let i = 1; i <= 1000; i++) {
    documents.push(
      new Document({
        id: i,
        title: `Doc title ${i}`,
        data: `Some data ${i}`,
      })
    );
  }

  // Insert documents into the collection
  await Document.insertMany(documents);
  console.log("Inserted 1,000 documents");

  // Generate 10,000 interactions for 5000
  await Interaction.deleteMany({});
  let interactions = [];
  for (let i = 1; i <= 1000; i++) {
    const randomNum = Math.floor(Math.random() * 100);
    for (let j = 0; j < randomNum; j++) {
      const like = Math.random() < 0.5;
      interactions.push(
        new Interaction({
          docId: i,
          like: like,
          dislike: !like,
          comment: `Interaction comment ${j} | Document ${i}`,
        })
      );
    }
    await Interaction.insertMany(interactions);
    console.log(`Inserted interactions for document ${i}`);
    interactions = [];
  }

  console.log("Inserted all interactions");
  await mongoose.disconnect();
  return "done";
})();
