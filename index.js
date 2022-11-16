const express = require("express");
const app = express();
const port = 4000;

const passport = require("passport");
const mongoose = require("mongoose");

require("./models/User");
require("./routes/authRoutes")(app);
// require("./services/passport");

mongoose.connect("mongodb+srv://admin:lumi12345@usersauthenticatewithgo.j17kmav.mongodb.net/?retryWrites=true&w=majority");

app.use(passport.initialize());

app.listen(port, () => {
    console.log("server is listening on port:", port);
});
