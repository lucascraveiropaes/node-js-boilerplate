import User from "dao/User";

const whitelist = ["/", "/test"];
const invalidAccessResponse = {
    status: false,
    message: "Acesso não permitido"
}

async function AuthMiddleware(req, res, next) {
    if (whitelist.includes(req.originalUrl))
        return next();

    if (req.originalUrl === "/users/login")
        return next();

    const token = req.headers["x-auth-token"];

    if (typeof token === "undefined" || token === null)
        return res.status(403).send(invalidAccessResponse);

    const user = await User.findOne({ token });

    if (user === null)
        return res.status(403).send(invalidAccessResponse);

    req.midd = { user };

    return next();
}

export default AuthMiddleware;
