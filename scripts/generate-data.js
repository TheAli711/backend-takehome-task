const mongoose = require("mongoose");
const { Document } = require("../src/models/doc.model");
const { Interaction } = require("../src/models/interaction.model");

const url = process.env.MONGO_DB_URI;

(async () => {
  await mongoose.connect(url);
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

  await Document.insertMany(documents);
  console.log("Inserted 1,000 documents");

  await Interaction.deleteMany({});
  let interactions = [];
  for (let i = 1; i <= 1000; i++) {
    const randomNum = Math.floor(Math.random() * (i <= 10 ? 5 : 10));
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
