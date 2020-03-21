import express          from "express";
import userController   from "controllers/UserController";
import "express-group-routes";

const router = express.Router();

router.group("/users", (router) => {
    router.post("/login", userController.login);
    router.post("/", userController.newUser);
    router.get("/", userController.listUsers);
    router.put("/", userController.updateUser);
    router.delete("/:userID", userController.deleteUser);
});

module.exports = router;
