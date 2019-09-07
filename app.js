import express          from "express";
import cors             from "cors";
import bodyParser       from "body-parser";
import * as Routes      from "routes";
import AuthMiddleware   from "middlewares/AuthMiddleware";

const app = express();
const PORT = 5000;

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( cors() );
app.use( AuthMiddleware );

// Import all routes inside routes folder
for (let route in Routes) {
    if (Routes.hasOwnProperty(route) && route !== "default") {
        app.use(Routes[route]);
    }
}

app.listen(PORT, () => {
    console.clear();
    console.log(`Server running on port ${PORT}`)
});
