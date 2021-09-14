const express = require("express");
const cors = require("cors");
const app = express();

// const corsOptions = { origin: "http://localhost:3000" };

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./model");
db.sequelize.sync().then(() => console.log("Connected to MySQL"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to jago applications" });
});

require("./routes/tutorial.route")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
