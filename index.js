const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { StreamChat } = require("stream-chat")
const { v4 } = require("uuid")
const bcrypt = require("bcrypt")
const connection = require("./config/db")
const RoomRouter = require("./routes/roomRoutes")
const UserRouter = require("./routes/userRoutes")
require("dotenv").config()
const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send({
        message: "Home Page"
    })
})

const api_key = "dnkx7pvtvsqg";
const api_secret =
    "98dhq3e3qa3q6fx3nxdnwq3fyvbc6nrd6sq2vbg5ctwxdmvzpd29fxmb4ngva72b";

const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, username, password } = req.body;
        const userId = v4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = serverClient.createToken(userId);
        res.json({ token, userId, firstName, lastName, username, hashedPassword });
    } catch (error) {
        res.json(error);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const { users } = await serverClient.queryUsers({ name: username });
        if (users.length === 0) return res.json({ message: "User not found" });

        const token = serverClient.createToken(users[0].id);
        const passwordMatch = await bcrypt.compare(
            password,
            users[0].hashedPassword
        );

        if (passwordMatch) {
            res.json({
                token,
                firstName: users[0].firstName,
                lastName: users[0].lastName,
                username,
                userId: users[0].id,
            });
        }
    } catch (error) {
        res.json(error);
    }
});

app.use("/rooms", RoomRouter)

app.use("/users", UserRouter)

app.listen(process.env.Port, async () => {
    try {
        await connection
        console.log("Connect to DB")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`Running at port ${process.env.Port}`)
})

/**
 * const express=require("express")
const cors=require("cors")
const {StreamChat}=require("stream-chat")
const {v4} =require("uuid")
const bcrypt=require("bcrypt")
const app = express();

app.use(cors());
app.use(express.json());
const api_key = "dnkx7pvtvsqg";
const api_secret =
  "98dhq3e3qa3q6fx3nxdnwq3fyvbc6nrd6sq2vbg5ctwxdmvzpd29fxmb4ngva72b";

const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = v4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    res.json(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { users } = await serverClient.queryUsers({ name: username });
    if (users.length === 0) return res.json({ message: "User not found" });

    const token = serverClient.createToken(users[0].id);
    const passwordMatch = await bcrypt.compare(
      password,
      users[0].hashedPassword
    );

    if (passwordMatch) {
      res.json({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        username,
        userId: users[0].id,
      });
    }
  } catch (error) {
    res.json(error);
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
 */