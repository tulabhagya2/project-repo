
require("dotenv").config();
const express = require("express");
const cors = require(cors());


const dbHealthCheck = require("./src/utils/dbHealthCheck")
const authRoute = require("./src/routes/authRoutes");
const accountRoute = require("./src/routes/accountRoutes")
const PORT = 5565;
const app = express();
app.use(express.json());
app.use("/", authRoute);
app.use(cors());


app.listen(PORT, async () => {
    const isConnected = await dbHealthCheck();
    if (!isConnected) {
        console.log("server is not not started due to db connection failure");
        process.exit(1);

    }
    console.log(`server is started listening on the port ${PORT}`);
})
