const mongoose = require('mongoose');

mongoose
  .connect(
    "mongodb+srv://"+ process.env.DB_USER_PASS + "@corcovado.wbbhpsd.mongodb.net/corcovado",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));
