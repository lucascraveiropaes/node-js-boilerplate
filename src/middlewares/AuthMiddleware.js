import { User } from "models";

const whitelist = ["/", "/test"];
const invalidAccessResponse = {
    status: false,
    message: "Acesso não permitido"
}

async function AuthMiddleware(req, res, next) {
    if (whitelist.includes(req.originalUrl))
        return next();

    if (typeof req.headers["client-key"] === "undefined")
        return res.status(403).send(invalidAccessResponse);

    if (req.originalUrl === "/users/login")
        return next();

    if (typeof req.headers["x-auth-token"] === "undefined")
        return res.status(403).send(invalidAccessResponse);

    const clientKey = req.headers["client-key"];
    const token = req.headers["x-auth-token"];

    const user = await User.findOne({
        where: {
            clientKey,
            token
        }
    });

    if (user === null)
        return res.status(403).send(invalidAccessResponse);

    return next();
}

export default AuthMiddleware;
