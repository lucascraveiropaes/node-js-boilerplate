import express          from "express";
import cors             from "cors";
import bodyParser       from "body-parser";
import * as Routes      from "routes";
import AuthMiddleware   from "middlewares/AuthMiddleware";
import Database         from "utils/Database";

const app = express();
const PORT = 5000;

app.use( bodyParser.json({ limit: "100mb" }) );
app.use( bodyParser.urlencoded({ limit: "100mb", extended: true }) );
app.use( cors() );
app.use( AuthMiddleware );

// Import all routes inside routes folder
for (let route in Routes) {
    if (Routes.hasOwnProperty(route) && route !== "default") {
        app.use(Routes[route]);
    }
}

// 404 Error Handler
app.use((req, res) => {
    res.status(404);
    return res.send({ status: false, error: 404 });
});

Database(() => {
    app.listen(PORT, () => {
        console.clear();
        console.log(`Server running on port ${PORT}`)
    });
});
