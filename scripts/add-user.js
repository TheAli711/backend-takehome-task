const mongoose = require("mongoose");
const { User } = require("../src/models/user.model");

// Connection URL
const url = process.env.MONGO_DB_URI;

// Connect to MongoDB
mongoose.connect(url);

const main = async () => {
  const user = await User.findOne({ email: "ali7112001@gmail.com" });
  if (!user) {
    await User.create({
      firstName: "Ali",
      lastName: "Mansoor",
      email: "ali7112001@gmail.com",
      password: "$2a$08$nU1H9h/oP6JKoZ53FD2WUee6Sx3QHm6.Q0Qwmq2kasB6pEvwHOmUy", // Admin@123
    });
    console.log("Admin user created");
  } else {
    console.log("Admin user already exists");
  }
};

main().then(async () => {
  await mongoose.disconnect();
});
