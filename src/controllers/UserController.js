import * as UserUtils from "utils/User";
import * as GeneralUtils from "utils/General";
import { User } from "models";

let response = {
    status: false,
    message: "Erro no servidor"
};

class UserController {
    async login(req, res) {
        try {
            let data = req.body;

            if (UserUtils.validateUserLogin(data) === false) {
                response.message = "Informe os dados corretamente";
                return res.status(400).send(response);
            }

            const user = await User.findOne({
                where: {
                    email: data.login,
                    password: data.password
                }
            });

            if (user !== null) {
                const clientKey = req.headers["client-key"];
                const token = GeneralUtils.generateToken();

                const result = await UserUtils.updateTokenAndKey(
                    clientKey,
                    token,
                    user.id
                );

                if (result) {
                    // The code above, is an example of how the email
                    // function can be simply used on the project
                    // GeneralUtils.sendEmail({
                    //     to: user.login,
                    //     subject: "New access with your account",
                    //     html: `Your account has been accessed at ${GeneralUtils.getDatetime(user.updatedAt)}`
                    // });

                    response.message = `Seja bem vindo, ${user.name}`;
                    response.user = user.get({ plain: true });
                    response.status = true;
                    response.user.token = token;
                    response.user.clientKey = clientKey;
                    delete response.message;
                    delete response.user.status;
                    delete response.user.password;
                    return res.status(200).send(response);
                } else {
                    delete response.user;
                    response.status = false;
                    response.message = "Não foi possível liberar o seu acesso no momento";
                    return res.status(500).send(response);
                }
            }

            response.status = false;
            response.message = "Dados informados incorretos";
            delete response.user;
            return res.status(200).send(response);
        } catch (e) {
            console.log(e);
            response = {
                status: false,
                message: "Erro no servidor"
            };

            return res.status(500).send(response);
        }
    }
}

export default new UserController();
