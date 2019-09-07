import express          from "express";
import { sendEmail }    from "utils/General";
import { User }         from "models";
const router = express.Router();

router.get("/", (req, res) => {
    return res.status(200).send("NodeJS Boilerplate API - v0.1");
});

router.get("/test", async (req, res) => {
    try {
        console.log(req);
    } catch (e) {
        console.log(e);
    }
});


module.exports = router;
