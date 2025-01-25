require('dotenv').config();
const morgan = require("morgan")
const cookieParser = require('cookie-parser');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB, checkDBConnectionMW } = require('./config/mongo_db');
const app = express();

const auth_routes = require("./routes/auth_routes")
const tasks_routes = require("./routes/tasks_routes")
const teams_routes = require("./routes/teams_routes")
const projects_routes = require("./routes/projects_routes")
const users_routes = require("./routes/users_routes")

app.use(cors({ origin: 'http://37.151.225.71:3000', credentials: true,}));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
    connectDB();
}

app.use(bodyParser.json());
app.use(cookieParser());


app.use(checkDBConnectionMW);
app.use("/api/auth", auth_routes);
app.use("/api/tasks", tasks_routes);
app.use("/api/teams", teams_routes);
app.use("/api/projects", projects_routes);
app.use("/api/users", users_routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;